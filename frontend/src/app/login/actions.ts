'use server';
import { cookies } from 'next/headers';

export async function login(formdata: FormData) {
  const email = formdata.get('email') as string;
  const password = formdata.get('password') as string;

  const res = await fetch('http://localhost:4000/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return data.message;
  }

  // cookieを取得
  const cookieStore = await cookies();
  // set(name, value, options)
  cookieStore.set('accessToken', data.accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });

  return 'success';
}
