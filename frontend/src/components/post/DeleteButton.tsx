'use client';

import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const ok = confirm('本当に削除しますか？');
    if (!ok) return;

    await fetch(`http://localhost:4000/posts/${id}`, {
      method: 'DELETE',
    });

    router.replace('/posts');
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:shadow-xl transition"
    >
      削除
    </button>
  );
}
