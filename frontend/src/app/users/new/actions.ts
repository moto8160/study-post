export async function createUser(formData: FormData) {
  const name = formData.get('name') as string;
  const email  = formData.get('email') as string;
  const password = formData.get('password') as string;

  const res = await fetch('http://localhost:4000/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, //JSON指定
    body: JSON.stringify({ name, email, password }), //js-JSON.stringify: オブジェクトをJSONに変換
  });

  if (!res.ok) {
    const data = await res.json();
    return data.message.join('、');
  }

  return 'success';
}
