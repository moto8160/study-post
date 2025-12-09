import { PostDetail } from '@/src/types/post';
import { formatDateTime } from '@/src/utils/formatDate';
import Link from 'next/link';
import DeleteButton from './DeleteButton';
import LikeButton from './LikeButton';

type Props = {
  post: PostDetail;
  currentUserId: number;
};

export default function PostDetailHeader({ post, currentUserId }: Props) {
  return (
    <>
      <div className="bg-white p-4 rounded-xl shadow">
        <Link href={`/users/${post.user.id}`}>
          <h2 className="text-sm mb-1 hover:bg-gray-100 transition inline-block">
            {post.user.name}
          </h2>
        </Link>
        <h2 className="text-xl font-medium mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-5">{post.content}</p>
        <div className="flex gap-5 text-sm text-gray-600 mb-3">
          <span>📅 {new Date(post.date).toLocaleDateString('ja-JP')}</span>
          <span>⏱ {post.studyTime} 時間</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-3 items-center">
            <span className="text-sm">💬 {post._count.comments}</span>
            <span>
              <LikeButton postId={post.id} likesCount={post._count.likes} isLiked={post.isLiked} />
            </span>
          </div>
          <span className="text-xs text-gray-400">投稿： {formatDateTime(post.updatedAt)}</span>
        </div>
      </div>
      <div>
        {post.user.id === currentUserId && (
          <div className="flex gap-3 mt-3 pl-3">
            <Link
              href={`/posts/${post.id}/edit`}
              className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:shadow-xl transition"
            >
              編集
            </Link>
            <DeleteButton id={String(post.id)} />
          </div>
        )}
      </div>
    </>
  );
}
