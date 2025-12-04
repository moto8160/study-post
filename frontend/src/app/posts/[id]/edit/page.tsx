import EditForm from '@/src/components/post/EditForm';

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(`http://localhost:4000/posts/${id}`);
  const post = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-6">投稿編集</h1>
      <EditForm post={post} />
    </div>
  );
}
