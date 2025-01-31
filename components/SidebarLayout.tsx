import { ReactNode } from 'react';
import Link from 'next/link';
import { getPosts, getUsers, User, Post } from '@/app/services/posts';
import Author from '@/components/Author';

interface SidebarLayoutProps {
  children: ReactNode;
  post: Post;
}

// xport default async function SidebarLayout({ children }: { children: ReactNode }) { // react innerHTML as children for typescript
export default async function SidebarLayout({ children, post }: SidebarLayoutProps) { // updated to include full interace children and post 
  const [posts, users] = await Promise.all([getPosts(), getUsers()]);  // updated to get users too
  const usersMap = new Map<number, User>(users.map(user => [user.id, user])); // map users to recent posts 


  //  let postAuthor;
  // if (post) {
  //     postAuthor = usersMap.get(post.userId);
  // } else {
  //     postAuthor = null;
  // }
  // console.log('current Post:', post);

  const postAuthor = post ? usersMap.get(post.userId) : null;

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">

      <main className="flex-1">{children}</main> {/* article className="pros... etc used in page */}

      <aside className="w-full md:w-64 lg:w-80 space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
          <nav className="space-y-2">
            {posts.slice(0, 5).map((post) => {
              const author = usersMap.get(post.userId);
              return (
                <div key={post.id}>
                  <Link
                    href={`/posts/${post.id}`}
                    className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors line-clamp-1 font-medium"
                  >
                    {post.title}
                  </Link>
                  {author && <Author firstname={author.firstname} lastname={author.lastname} />}
                </div>
              );
            })}
          </nav>
        </div>


        {postAuthor && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Author</h2>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {postAuthor.firstname} {postAuthor.lastname}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {postAuthor.email}
                </p>
              </div>
            </div>
          </div>
        )}

      </aside>

    </div>
  );
}


