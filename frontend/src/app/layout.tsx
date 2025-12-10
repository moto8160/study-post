import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { getCurrentUserId } from '../utils/getCurrentUserId';
import { logout } from '../features/auth/api';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Study Post',
  description: '毎日の勉強内容を記録・共有できるアプリ',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const currentUserId = await getCurrentUserId();
  return (
    // children-各ページをレンダリング
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <header className="fixed w-full bg-black text-white p-4 flex gap-5">
          <Link href="/" className="hover:text-gray-300 transition">
            投稿一覧
          </Link>
          {currentUserId ? (
            <>
              <Link href="/posts/create" className="hover:text-gray-300 transition">
                新規投稿
              </Link>
              <Link href={`/users/${currentUserId}`} className="hover:text-gray-300 transition">
                マイページ
              </Link>
              <Link href="/users" className="hover:text-gray-300 transition">
                ユーザー一覧
              </Link>
              <form action={logout}>
                <button className="hover:text-gray-300 transition">ログアウト</button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300 transition">
                ログイン
              </Link>
              <Link href="/users/create" className="hover:text-gray-300 transition">
                ユーザー登録
              </Link>
            </>
          )}
        </header>
        <main className="pt-14 bg-gray-50 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
