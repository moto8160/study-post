'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

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
