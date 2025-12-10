import CreateForm from "@/src/features/posts/components/CreateForm";

export default function CreatePostPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4 border-b pb-1">新規投稿</h1>
      <CreateForm />
    </div>
  );
}
