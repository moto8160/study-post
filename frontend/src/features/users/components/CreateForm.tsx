'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUser } from '../api';

export default function CreateForm() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  async function handleSubmit(formData: FormData) {
    //Server Action
    const result = await createUser(formData);

    if (result !== 'success') {
      setMessage(result);
      return;
    }

    router.replace('/posts?status=success&type=auth&action=login');
  }

  return (
    <form action={handleSubmit} className="flex flex-col items-center space-y-4 bg-white p-6 rounded-xl shadow">
      <input name="name" placeholder="ユーザー名" className="w-80 p-2 border rounded-md" />
      <input name="email" placeholder="メールアドレス" className="w-80 p-2 border rounded-md" />
      <input
        name="password"
        type="password"
        placeholder="パスワード"
        className="w-80 p-2 border rounded-md"
      />
      <button className="bg-black text-white px-4 py-1 rounded-md  hover:shadow-xl transition">
        登録
      </button>

      {message && <p className="text-red-500 font-medium">{message}</p>}
    </form>
  );
}
