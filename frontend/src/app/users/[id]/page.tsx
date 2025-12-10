import PostCard from '@/src/features/posts/components/PostCard';
import { UserDetailResponse } from '@/src/features/users/types';
import { formatDateOnly } from '@/src/utils/formatDate';

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(`http://localhost:4000/users/${id}`);
  const user: UserDetailResponse = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-xs text-gray-400">登録: {formatDateOnly(user.createdAt)}</p>
        </div>
        <div className="text-sm">
          <p>投稿数: {user.posts.length}</p>
          <p>合計時間: {user.totalStudyTime} 時間</p>
        </div>
      </div>

      <h1 className="text-xl font-semibold mb-4 border-b pb-1">{user.name} の投稿</h1>
      <ul className="space-y-4">
        {user.posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
