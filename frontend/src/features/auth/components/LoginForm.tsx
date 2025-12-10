'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { login } from '../api';

export default function LoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  async function handleSubmit(formData: FormData) {
    // Server Action
    const result = await login(formData);

    if (result === 'success') {
      router.replace('/posts?status=success&type=auth&action=login');
    } else {
      setMessage(result);
    }
  }
  return (
    <form
      action={handleSubmit}
      className="flex flex-col items-center space-y-4 bg-white p-6 rounded-xl shadow"
    >
      <input name="email" placeholder="メールアドレス" className="w-96 p-2 border rounded-md" />
      <input
        name="password"
        type="password"
        placeholder="パスワード"
        className="w-96 p-2 border rounded-md"
      />
      <button className="bg-black text-white px-4 py-1 rounded-md  hover:shadow-xl transition">
        ログイン
      </button>

      {message && <p className="text-red-500 font-medium">{message}</p>}
    </form>
  );
}
