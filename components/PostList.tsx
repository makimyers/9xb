'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post, getPosts, getTotalPosts } from '@/app/services/posts';

export default function PostList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 9;

  useEffect(() => { // check when page changes (setCurrentPage => [currentPage])
    const fetchData = async () => {
      const [postsData, total] = await Promise.all([ // promise all to run get posts and get total
        getPosts(currentPage, postsPerPage),
        getTotalPosts() // just in case total posts count changes - which it wont here
      ]);
      // setPosts(prev => [...prev, ...postsData]); // add new posts to existing ones for infinite scrol BUG

      // spreading previous and adding new ones is causing duplicate keys when navigating back
      // check for duplicates and add more unique keys instead
      setPosts(prevPosts => {
        const newPosts = [...prevPosts];
        postsData.forEach(post => {
          if (!newPosts.some(p => p.id === post.id)) {
            newPosts.push(post);
          }
        });
        return newPosts;

      });
      setTotalPosts(total);
    };
    fetchData();
  }, [currentPage]);

  const hasMore = posts.length < totalPosts;

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              <Link href={`/posts/${post.id}`} className="hover:text-blue-600 transition-colors">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
              {post.content}
            </p>
          </article>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setCurrentPage(prev => prev + 1)} // functional update for latest state value 
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          disabled={!hasMore}
        >
          Load More
        </button>
      )}
    </div>
  );
}