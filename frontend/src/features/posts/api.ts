'use server';
import { authFetch } from '@/src/utils/authFetch';

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  const content = formData.get('content');
  const studyTime = Number(formData.get('studyTime')); //フォームはすべてstringとなる
  const date = formData.get('date');

  const res = await authFetch('/posts', {
    method: 'POST',
    body: JSON.stringify({ title, content, studyTime, date }), //js-JSON.stringify: オブジェクトをJSONに変換
  });

  if (!res.ok) {
    const data = await res.json();
    return data.message.join('、');
  }

  return 'success';
}

export async function updatePost(formData: FormData) {
  const id = formData.get('id');
  const title = formData.get('title');
  const content = formData.get('content');
  const studyTime = Number(formData.get('studyTime'));
  const date = formData.get('date');

  const res = await authFetch(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, content, studyTime, date }),
  });

  if (!res.ok) {
    const data = await res.json();
    return data.message.join('、');
  }

  return 'success';
}

export async function deletePost(id: number) {
  const res = await authFetch(`/posts/${id}`, { method: 'DELETE' });
  return res.ok; //true,false
}

export async function createComment(postId: number, formData: FormData) {
  const content = formData.get('content');
  const res = await authFetch(`/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    const data = await res.json();
    return data.message ?? '投稿に失敗しました'; //??-null,undefinedの時
  }

  return 'success';
}

export async function createLike(postId: number) {
  const res = await authFetch(`/posts/${postId}/likes`, { method: 'POST' });
  return res.ok;
}

export async function deleteLike(postId: number) {
  const res = await authFetch(`/posts/${postId}/likes`, { method: 'DELETE' });
  return res.ok;
}
