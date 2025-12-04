'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '@/src/types/post';
import { updatePost } from '@/src/app/posts/[id]/edit/actions';

export default function EditForm({ post }: { post: Post }) {
  const router = useRouter();
  const [message, setMessage] = useState('');

  async function handleSubmit(formData: FormData) {
    formData.append('id', String(post.id)); //idも送る
    //server-actions.ts
    const result = await updatePost(formData);
    if (result !== 'success') {
      setMessage(result);
      return;
    }
    router.replace('/posts?status=success&type=post&action=update');
  }

  return (
    <form action={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
      <input name="title" defaultValue={post.title} className="w-full p-2 border rounded-md" />
      <textarea
        name="content"
        defaultValue={post.content}
        className="w-full p-2 border rounded-md h-24"
      />
      <input
        type="date"
        name="date"
        defaultValue={post.date.split('T')[0]}
        className="w-full p-2 border rounded-md"
      />
      <input
        type="number"
        name="studyTime"
        defaultValue={post.studyTime}
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
