import Message from '@/src/components/message';
import LoginForm from '@/src/features/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Message />
      <h1 className="text-xl font-semibold mb-4 border-b pb-1">ログイン</h1>
      <LoginForm />
    </div>
  );
}
