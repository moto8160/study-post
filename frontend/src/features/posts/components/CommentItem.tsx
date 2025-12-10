import { formatDateTime } from '@/src/utils/formatDate';
import Link from 'next/link';
import { CommentWithUser } from '../types';

type Props = {
  comment: CommentWithUser;
};

export default function CommentItem({ comment }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <Link href={`/users/${comment.user.id}`}>
        <div className="font-semibold mb-1 hover:bg-gray-100 transition inline-block">
          {comment.user.name}
        </div>
      </Link>
      <p>{comment.content}</p>
      <p className="text-xs text-gray-400 text-right">投稿： {formatDateTime(comment.createdAt)}</p>
    </div>
  );
}
