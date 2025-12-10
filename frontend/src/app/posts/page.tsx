import Message from '@/src/components/message';
import PostCard from '@/src/features/posts/components/PostCard';
import { PostListResponse } from '@/src/features/posts/types';


export default async function PostsPage() {
  const res = await fetch('http://localhost:4000/posts');
  const posts: PostListResponse[] = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <Message />

      <h1 className="text-xl font-semibold mb-4 border-b pb-1">投稿一覧</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
