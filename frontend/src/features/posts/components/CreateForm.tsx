'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '../api';

export default function CreateForm() {
  const router = useRouter();
  // [変数名, 更新する関数名] = useState(初期値)
  const [message, setMessage] = useState('');

  async function handleSubmit(formData: FormData) {
    // Server Action
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
      <button className="bg-black text-white px-4 py-1 rounded-md  hover:shadow-xl transition">
        投稿
      </button>

      {message && <p className="text-red-500 font-medium">{message}</p>}
    </form>
  );
}
