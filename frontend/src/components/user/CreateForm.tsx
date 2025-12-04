'use client';
import { createUser } from '@/src/app/users/new/actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateForm() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  async function handleSubmit(formData: FormData) {
    //server-actions.ts
    const result = await createUser(formData);

    if (result !== 'success') {
      setMessage(result);
      return;
    }

    router.replace('/posts?status=success&action=user');
  }

  return (
    <div className="flex justify-center bg-white p-6 rounded-xl shadow">
      <form action={handleSubmit} className="flex flex-col space-y-4 ">
        <input name="name" placeholder="ユーザー名" className="w-96 p-2 border rounded-md" />
        <input name="email" placeholder="メールアドレス" className="w-96 p-2 border rounded-md" />
        <input
          name="password"
          type="password"
          placeholder="パスワード"
          className="w-96 p-2 border rounded-md"
        />

        <button className="w-96 bg-black text-white p-2 rounded-md font-semibold hover:shadow-xl">
          登録
        </button>

        {message && <p className="text-center text-red-500 font-semibold">{message}</p>}
      </form>
    </div>
  );
}
