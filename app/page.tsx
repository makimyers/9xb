// import { getPosts } from './services/posts';
import PostList from '@/components/PostList';

export default function Home() {
  //const posts = await getPosts();
 
  return (
    <main className="container mx-auto px-4 py-8 ">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
        Latest Posts
      </h1>
      <PostList />
      {/*<PostList posts={posts} /> // old posts - simple */}
    </main>
  );
}



