import { PostList } from '@/src/types/post';
import { formatDateOnly, formatDateTime } from '@/src/utils/formatDate';
import Link from 'next/link';

type Props = {
  post: PostList;
};

export default function PostCard({ post }: Props) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="block bg-white p-3 rounded-xl shadow hover:shadow-xl transition"
    >
      <h2 className="text-sm mb-1">{post.user.name}</h2>
      <h2 className="text-xl font-medium mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <div className="flex gap-5 text-sm text-gray-600">
        <span>📅 {formatDateOnly(post.date)}</span>
        <span>⏱ {post.studyTime} 時間</span>
      </div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-3">
          <span className="text-sm">💬 {post._count.comments}</span>
          <span className="text-sm">🤍 {post._count.likes}</span>
        </div>
        <span className="text-xs text-gray-400">投稿： {formatDateTime(post.updatedAt)}</span>
      </div>
    </Link>
  );
}
