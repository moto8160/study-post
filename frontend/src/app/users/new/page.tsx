import CreateForm from '@/src/components/user/CreateForm';

export default function CreateUserPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-6">ユーザー登録</h1>
      <CreateForm />
    </div>
  );
}
