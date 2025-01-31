import { getPost } from '@/app/services/posts';
import SidebarLayout from '@/components/SidebarLayout';

// Define the params type as a Promise
type Params = Promise<{ id: string }>;

export default async function PostPage({ params }: { params: Params }) {
  // await the params to get the resolved object
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.id); // fetch post data using the resolved ID from PostList

  return (
    <SidebarLayout post={post}> {/* pass post data */}
      <article className="prose dark:prose-invert max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-64 object-cover mb-8 rounded-lg"
        />
        <div dangerouslySetInnerHTML={{ __html: post.content }} /> {/* set inner html = innerHTML - setting content in the sidebar layout */}
      </article>
    </SidebarLayout>
  );
}
