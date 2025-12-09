'use server';
import { authFetch } from '@/src/utils/authFetch';

export async function createLike(postId: number) {
  await authFetch(`/posts/${postId}/likes`, { method: 'POST' });
}

export async function deleteLike(postId: number) {
  await authFetch(`/posts/${postId}/likes`, { method: 'DELETE' });
}