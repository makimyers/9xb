import Link from 'next/link';
import { Post } from '@/app/services/posts';

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
}