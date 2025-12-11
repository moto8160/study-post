'use client';
import { useSearchParams } from 'next/navigation';

export default function Message() {
  const searchParams = useSearchParams(); //クエリ文字列を取得
  // パラメータを取得
  const status = searchParams.get('status');
  const type = searchParams.get('type');
  const action = searchParams.get('action');

  if (!status || !type || !action) return null;

  let classes = 'p-3 rounded font-medium mb-4';
  let message = '';

  if (status === 'success') {
    classes += ' bg-green-100 ';

    if (type === 'post') {
      if (action === 'create') {
        message = '新規投稿しました！';
      }
      if (action === 'update') {
        message = '投稿を更新しました！';
      }
      if (action === 'delete') {
        message = '投稿を削除しました！';
      }
    }

    if (type === 'auth') {
      if (action === 'login') {
        message = 'ログインしました！';
      }
      if (action === 'logout') {
        message = 'ログアウトしました！';
      }
    }
  }

  if (status === 'error') {
    classes += ' bg-red-100 text-red-600';

    if (type === 'auth') {
      if (action === 'login') {
        message = 'ログインしてください';
      }
    }
  }

  if (!message) return null;
  return <p className={classes}>{message}</p>;
}
