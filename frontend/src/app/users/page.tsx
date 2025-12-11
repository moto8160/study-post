import Link from 'next/link';
import Message from '@/src/components/message';
import { formatDateOnly } from '@/src/utils/formatDate';
import { UserListResponse } from '@/src/features/users/types';

export default async function PostsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/users`);
  const users: UserListResponse[] = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <Message />

      <h1 className="text-xl font-semibold mb-4 border-b pb-1">ユーザー一覧</h1>
      <ul className="space-y-2">
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
