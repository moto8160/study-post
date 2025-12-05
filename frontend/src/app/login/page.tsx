"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "./actions";
import Message from "@/src/components/message";

export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  async function handleSubmit(formData: FormData) {
    const result = await login(formData);

    if (result === 'success') {
      router.push('/posts?status=success&type=auth&action=login');
    } else {
      setMessage(result);
    } 
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Message />
      <h1 className="text-3xl text-center font-bold mb-6">ログイン</h1>
      <div className="flex justify-center bg-white p-6 rounded-xl shadow">
        <form action={handleSubmit} className="flex flex-col space-y-4 ">
          <input name="email" placeholder="メールアドレス" className="w-96 p-2 border rounded-md" />
          <input
            name="password"
            type="password"
            placeholder="パスワード"
            className="w-96 p-2 border rounded-md"
          />

          <button className="w-96 bg-black text-white p-2 rounded-md font-semibold hover:shadow-xl">
            ログイン
          </button>

          {message && <p className="text-center text-red-500 font-semibold">{message}</p>}
        </form>
      </div>
    </div>
  );
}
