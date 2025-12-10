'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createLike, deleteLike } from '../api';

type Props = {
  postId: number;
  likesCount: number;
  isLiked: boolean;
};

export default function LikeButton({ postId, likesCount, isLiked }: Props) {
  const router = useRouter();
  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(likesCount);

  const handleLike = async () => {
  // いいね済み
  if (liked) {
    setLiked(false);
    setCount((c) => c - 1);

    const res = await deleteLike(postId);

    if (res === false) {
      setLiked(true);
      setCount((c) => c + 1);
      alert('失敗しました');
      return;
    }
  // 未いいね
  } else {
    setLiked(true);
    setCount((c) => c + 1);

    const res = await createLike(postId);

    if (res === false) {
      setLiked(false);
      setCount((c) => c - 1);
      alert('失敗しました');
      return;
    }
  }

  router.refresh();
};

  return (
    <button onClick={handleLike} className={`text-sm hover:bg-gray-100 transition ${liked ? "text-red-500" : "text-black"}`}>
      {liked ? '❤️' : '🤍'} {count}
    </button>
  );
}
