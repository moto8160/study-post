import CreateForm from '@/src/components/post/CreateForm';

export default function CreatePostPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-6">新規投稿</h1>
      <CreateForm />
    </div>
  );
}
