import { Post } from 'generated/prisma';

export class UserListDto {
  id: number;
  name: string;
  createdAt: Date;
}

export class UserDetailDto {
  id: number;
  name: string;
  createdAt: Date;
  posts: Post[];
  totalStudyTime: number;
}
