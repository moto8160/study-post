import Link from 'next/link';
import { PostResponse } from '@/src/types/post';
import Message from '@/src/components/message';

const formatDate = (date: string) =>
  new Date(date).toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

export default async function PostsPage() {
  const res = await fetch('http://localhost:4000/posts');
  const posts: PostResponse[] = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <Message />

      <h1 className="text-3xl text-center font-bold mb-6">投稿一覧</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/posts/${post.id}`}
              className="block bg-white p-4 rounded-xl shadow hover:shadow-xl transition"
            >
              <h2 className="text-sm mb-1">{post.user.name}</h2>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-5">{post.content}</p>
              <div className="flex gap-5 text-sm text-gray-600">
                <span>📅 {new Date(post.date).toLocaleDateString('ja-JP')}</span>
                <span>⏱ {post.studyTime} 時間</span>
              </div>
              <p className="text-xs text-gray-400 text-right">更新: {formatDate(post.updatedAt)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
