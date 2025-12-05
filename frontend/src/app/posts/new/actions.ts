'use server';
import { cookies } from 'next/headers';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const studyTime = Number(formData.get('studyTime'));
  const date = formData.get('date') as string;

  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  const res = await fetch('http://localhost:4000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', //データ形式：JSON
      Authorization: `Bearer ${token}`, //JWT付与
    },
    body: JSON.stringify({ title, content, studyTime, date }), //js-JSON.stringify: オブジェクトをJSONに変換
  });

  if (!res.ok) {
    const data = await res.json();
    return data.message.join('、');
  }

  return 'success';
}
