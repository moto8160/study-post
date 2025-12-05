import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { logout } from './logout/actions';

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // children-各ページをレンダリング
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <header className="fixed w-full bg-black text-white p-4 flex gap-5">
          <Link href="/">投稿一覧</Link>
          <Link href="/posts/new">新規投稿</Link>
          <Link href="/users">ユーザー一覧</Link>
          <Link href="/users/new">ユーザー登録</Link>
          <Link href="/login">ログイン</Link>
          <form action={logout}>
            <button>ログアウト</button>
          </form>
        </header>
        <main className="pt-14 bg-gray-50 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
