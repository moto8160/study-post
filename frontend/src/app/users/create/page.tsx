import CreateForm from "@/src/features/users/components/CreateForm";

export default function CreateUserPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4 border-b pb-1">ユーザー登録</h1>
      <CreateForm />
    </div>
  );
}
