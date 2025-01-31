// exporting interface for use in postList etc
export interface Post {
    id: number;
    title: string;
    content: string;
    slug: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
  }

  export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
  }
  
  // original - simple get all, with no 'pagination'
  export const getPostsSimple = async (): Promise<Post[]> => {
    const res = await fetch('https://jsonplaceholder.org/posts');
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
  };

  export const getPosts = async (page: number = 1, limit: number = 9): Promise<Post[]> => {
    const res = await fetch('https://jsonplaceholder.org/posts');
    if (!res.ok) throw new Error('Failed to fetch posts');
    const allPosts = await res.json();

    // console.log(allPosts)
    
    // simulate pagination - API doesn't support real pagination
    const start = (page - 1) * limit;  // starting index
    const end = start + limit;         // ending index
    return allPosts.slice(start, end); // get desired fake of posts, between a and b
  };
  
  export const getTotalPosts = async (): Promise<number> => {
    const res = await fetch('https://jsonplaceholder.org/posts');
    if (!res.ok) throw new Error('Failed to fetch posts');
    const allPosts = await res.json();
    return allPosts.length;
  };
  
  export const getPost = async (id: string): Promise<Post> => {
    const res = await fetch(`https://jsonplaceholder.org/posts/${id}`);
    if (!res.ok) throw new Error('Failed to fetch post');
    return res.json();
  };

  export const getUsers = async (): Promise<User[]> => {
    const res = await fetch('https://jsonplaceholder.org/users');
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  };