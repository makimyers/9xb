import { getPost } from '@/app/services/posts';
import SidebarLayout from '@/components/SidebarLayout';

export default async function PostPage({ params }: { params: { id: string } }) {
  
  const post = await getPost(params.id); // fetch post data, ID coming from Link in PostList
  console.log('Post Data:', post);

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