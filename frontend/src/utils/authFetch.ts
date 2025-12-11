'use server';
import { cookies } from 'next/headers';
export async function authFetch(url: string, options: RequestInit = {}) {
  //RequestInit-fetchプロパティの型、={}-デフォルト値で空オブジェクト
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  return fetch(`${process.env.NEXT_PUBLIC_URL}${url}`, {
    ...options, //method, bodyなど
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}
