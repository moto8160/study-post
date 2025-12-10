'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createComment } from '../api';

type Props = {
  postId: number;
};

export default function CommentForm({ postId }: Props) {
  const router = useRouter();
  const [message, setMessage] = useState('');

  async function handleSubmit(formData: FormData) {
    // Server Action
    const result = await createComment(postId, formData);

    if (result !== 'success') {
      setMessage(result);
      return;
    }

    setMessage('');
    router.refresh(); //再fetchで最新化
  }

  return (
    <form action={handleSubmit} className="my-5">
      <textarea
        name="content"
        placeholder="コメントを入力"
        className="w-full p-2 rounded-md"
      ></textarea>
      <button className="bg-black text-white px-3 py-1 rounded-md  hover:shadow-xl transition my-2">
        投稿
      </button>
      {message && <p className=" text-red-500 font-medium">{message}</p>}
    </form>
  );
}
