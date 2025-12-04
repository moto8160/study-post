import Link from 'next/link';
import { UserList } from '@/src/types/user';
import Message from '@/src/components/message';

const formatDate = (date: string) =>
  new Date(date).toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

export default async function PostsPage() {
  const res = await fetch('http://localhost:4000/users');
  const users: UserList = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <Message />

      <h1 className="text-3xl text-center font-bold mb-6">ユーザー一覧</h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id}>
            <Link
              href={`/users/${user.id}`}
              className="block bg-white p-4 rounded-xl shadow hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-sm text-gray-600">{user.name}</h2>
                <p className="text-xs text-gray-400">作成: {formatDate(user.createdAt)}</p>
              </div>
            </Link>  
          </li>
        ))}
      </ul>
    </div>
  );
}
