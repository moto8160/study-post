import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value; //accessTokenを取得
  const path = req.nextUrl.pathname; //パスを取得

  // ログイン不要ページ
  const publicPaths = ['/', '/posts', '/users/new', '/login'];

  // ログイン済み
  if (token) {
    // すでにログイン中です
    if (path === '/login' || path === '/users/new') {
      return NextResponse.redirect(new URL('/posts?status=success&action=login', req.url));
    }
  }

  // 未ログイン
  if (!token) {
    // ログインしてください
    if (!publicPaths.includes(path)) {
      return NextResponse.redirect(new URL('/login?status=error&action=login', req.url));
    }
  }

  return; // 通過
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
