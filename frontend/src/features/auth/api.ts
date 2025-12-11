'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formdata: FormData) {
  const email = formdata.get('email');
  const password = formdata.get('password');

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return data.message.join('、');
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

export async function logout() {
  const cookieStore = await cookies();

  if (!cookieStore.get('accessToken')?.value) {
    redirect('/posts?status=error&action=logout');
  }

  cookieStore.set('accessToken', '', {
    maxAge: 0,
  });

  redirect('/posts?status=success&type=auth&action=logout');
}
