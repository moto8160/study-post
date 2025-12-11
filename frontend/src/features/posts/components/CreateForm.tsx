'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '../api';

export default function CreateForm() {
  const router = useRouter();
  // [変数名, 更新する関数名] = useState(初期値)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [studyTime, setStudyTime] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(formData: FormData) {
    // APIリクエスト
    const result = await createPost(formData);

    if (result !== 'success') {
      setMessage(result);
      return;
    }

    router.replace('/posts?status=success&type=post&action=create');
  }

  // アロー関数でいいけどあえて書くなら
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value; //今の入力値
    setTitle(newValue);
  }

  return (
    <form action={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
      <input
        name="title"
        value={title}
        onChange={handleChange} //制御コンポーネント
        placeholder="タイトル"
        className="w-full p-2 border rounded-md"
      />
      <textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="内容"
        className="w-full p-2 border rounded-md h-24"
      />
      <input
        type="date"
        name="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <input
        type="number"
        name="studyTime"
        value={studyTime}
        onChange={(e) => setStudyTime(e.target.value)}
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
