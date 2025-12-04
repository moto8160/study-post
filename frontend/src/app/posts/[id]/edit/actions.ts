export async function updatePost(formData: FormData) {
  // フォームデータの取り出し
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const studyTime = Number(formData.get('studyTime'));
  const date = formData.get('date') as string;

  const res = await fetch(`http://localhost:4000/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }, //JSON指定
    body: JSON.stringify({ title, content, studyTime, date }), //js-JSON.stringify: オブジェクトをJSONに変換
  });

  if (!res.ok) {
    const data = await res.json();
    return data.message.join('、');
  }

  return 'success';
}
