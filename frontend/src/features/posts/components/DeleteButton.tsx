'use client';
import { useRouter } from 'next/navigation';
import { deletePost } from '../api';

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    const ok = confirm('投稿を削除しますか？');
    if (!ok) return;

    // Server Action
    const success = await deletePost(id);
    
    if (!success) {
      alert('削除できません');
      return;
    }
    router.replace('/posts?status=success&type=post&action=delete');
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
