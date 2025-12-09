'use client';
import { createLike, deleteLike } from '@/src/app/posts/like/actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  postId: number;
  likesCount: number;
  isLiked: boolean;
};

export default function LikeButton({ postId, likesCount, isLiked }: Props) {
  const router = useRouter();

  // [変数名, 更新する関数名] = useState(初期値)
  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(likesCount);

  const handleLike = async () => {
    // clientからcookies()が使用不可
    if (liked) {
      setLiked(false);
      setCount((c) => c - 1);
      await deleteLike(postId);
    } else {
      setLiked(true);
      setCount((c) => c + 1);
      await createLike(postId);
    }

    router.refresh();
  };

  return (
    <button onClick={handleLike} className={`text-sm hover:bg-gray-100 transition ${liked ? "text-red-500" : "text-black"}`}>
      {liked ? '❤️' : '🤍'} {count}
    </button>
  );
}
