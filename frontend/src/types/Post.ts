import { Comment } from './comment';
import { Like } from './like';

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

export type PostList = Post & {
  user: {
    id: number;
    name: string;
  };
  _count: {
    comments: number;
    likes: number;
  };
};

export type PostDetail = PostList & {
  comments: Comment[];
  likes: Like[];
  isLiked: boolean;
};
