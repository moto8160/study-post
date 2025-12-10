import { login } from '../auth/api';

export async function createUser(formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');

  const res = await fetch('http://localhost:4000/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const data = await res.json();
    return data.message.join('、');
  }

  // 登録後はそのままログイン
  const result = await login(formData);
  
  if (result !== 'success') {
    return 'ログインできません';
  }

  return 'success';
}
