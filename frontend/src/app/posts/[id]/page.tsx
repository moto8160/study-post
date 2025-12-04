import DeleteButton from '@/src/components/post/DeleteButton';
import Link from 'next/link';

const formatDate = (date: string) =>
  new Date(date).toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:4000/posts/${id}`);
  const post = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <h1 className="text-3xl text-center font-bold mb-6">投稿詳細</h1>

      <div className="bg-white p-4 rounded-xl shadow">
        <Link href="`/users/${post.user.id}`" className="hover:underline">
          <h2 className="text-sm text-gray-600 mb-1">{post.user?.name}</h2>
        </Link>
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-5">{post.content}</p>

        <div className="flex gap-5 text-sm text-gray-600">
          <span>📅 {new Date(post.date).toLocaleDateString('ja-JP')}</span>
          <span>⏱ {post.studyTime} 時間</span>
        </div>

        <p className="text-xs text-gray-400 text-right">更新: {formatDate(post.updatedAt)}</p>

        <DeleteButton id={(await params).id} />
      </div>
    </div>
  );
}
