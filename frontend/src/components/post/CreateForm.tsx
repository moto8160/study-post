'use client';
import { createPost } from '@/src/app/posts/new/actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateForm() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  async function handleSubmit(formData: FormData) {
    //server-actions.ts
    const result = await createPost(formData);

    if (result !== 'success') {
      setMessage(result);
      return;
    }

    router.replace('/posts?status=success&type=post&action=create');
  }

  return (
    <form action={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
      <input name="title" placeholder="タイトル" className="w-full p-2 border rounded-md" />
      <textarea name="content" placeholder="内容" className="w-full p-2 border rounded-md h-24" />
      <input
        type="date"
        name="date"
        defaultValue={new Date().toISOString().split('T')[0]}
        className="w-full p-2 border rounded-md"
      />
      <input
        type="number"
        name="studyTime"
        placeholder="時間（h）"
        step="0.5"
        min="0.5"
        className="w-full p-2 border rounded-md"
      />

      <button className="w-full bg-black text-white p-2 rounded-md font-semibold hover:shadow-xl">
        投稿する
      </button>

      {message && <p className="text-center text-red-500 font-semibold">{message}</p>}
    </form>
  );
}
