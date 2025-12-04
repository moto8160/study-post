import { UserDetail } from '@/src/types/user';
import Link from 'next/link';

const formatDate = (date: string) =>
  new Date(date).toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(`http://localhost:4000/users/${id}`);
  const user: UserDetail = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <h1 className="text-3xl text-center font-bold mb-6">ユーザー情報</h1>
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-xs text-gray-400">登録: {formatDate(user.createdAt)}</p>
        </div>
        <div className="text-sm">
          <p>投稿数: {user.posts.length}</p>
          <p>合計時間: {user.totalStudyTime} 時間</p>
        </div>
      </div>

      <h1 className="text-2xl text-center font-bold mb-4">投稿一覧</h1>
      <ul className="space-y-4">
        {user.posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/posts/${post.id}`}
              className="block bg-white p-4 rounded-xl shadow hover:shadow-xl transition"
            >
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
