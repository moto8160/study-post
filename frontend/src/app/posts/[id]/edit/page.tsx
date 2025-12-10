import EditForm from "@/src/features/posts/components/EditForm";
import { PostDetailResponse } from "@/src/features/posts/types";
import { authFetch } from "@/src/utils/authFetch";

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await authFetch(`/posts/${id}`);
  const post: PostDetailResponse = await res.json();
  console.log(post);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4 border-b pb-1">投稿編集</h1>
      <EditForm post={post} />
    </div>
  );
}
