import { PostListResponse } from '../posts/types';

export type User = {
  // email,passwordなし
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type UserListResponse = User;

export type UserDetailResponse = User & {
  posts: PostListResponse[];
  totalStudyTime: number;
};
