import Link from 'next/link';
import Message from '@/src/components/message';
import { formatDateOnly } from '@/src/utils/formatDate';
import { UserListResponse } from '@/src/features/users/types';

export default async function PostsPage() {
  const res = await fetch('http://localhost:4000/users');
  const users: UserListResponse[] = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <Message />

      <h1 className="text-3xl text-center font-bold mb-6">ユーザー一覧</h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id}>
            <Link
              href={`/users/${user.id}`}
              className="block bg-white p-3 rounded-xl shadow hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center mb-1">
                <h2>{user.name}</h2>
                <p className="text-xs text-gray-400">登録: {formatDateOnly(user.createdAt)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
