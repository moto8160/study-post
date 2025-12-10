export type Post = {
  id: number;
  userId: number;
  title: string;
  content: string;
  date: string; // DateはJSONでstringに
  studyTime: number;
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  id: number;
  postId: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type Like = {
  id: number;
  postId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export type CommentWithUser = Comment & {
  user: {
    id: number;
    name: string;
  };
};

export type PostListResponse = Post & {
  user: {
    id: number;
    name: string;
  };
  _count: {
    comments: number;
    likes: number;
  };
};

export type PostDetailResponse = Post & {
  user: {
    id: number;
    name: string;
  };
  _count: {
    comments: number;
    likes: number;
  };
  comments: CommentWithUser[];
  likes: Like[];
  isLiked: boolean;
};

export type PostList = PostListResponse;
export type PostDetail = PostDetailResponse;
