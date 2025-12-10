'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updatePost } from '../api';
import { Post } from '../types';

type Props = {
  post: Post;
};

export default function EditForm({ post }: Props) {
  const router = useRouter();
  const [message, setMessage] = useState('');

  async function handleSubmit(formData: FormData) {
    formData.append('id', String(post.id)); //idも送る
    //Server Action
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
      <button className="bg-black text-white px-4 py-1 rounded-md  hover:shadow-xl transition">
        投稿
      </button>

      {message && <p className="text-red-500 font-medium">{message}</p>}
    </form>
  );
}
