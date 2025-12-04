import { Post } from "./post";

export type UserList = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}[];

export type UserDetail = {
  id: number;
  name: string;
  createdAt: string;
  posts: Post[];
  totalStudyTime: number;
};
