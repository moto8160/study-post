import { Prisma } from 'generated/prisma';

export type UserList = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

export type UserDetail = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    createdAt: true;
    updatedAt: true;
    posts: {
      include: {
        user: {
          select: { id: true; name: true };
        };
        _count: {
          select: { comments: true; likes: true };
        };
      };
    };
  };
}> & {
  totalStudyTime: number;
};

export type UserListResponse = UserList;
export type UserDetailResponse = UserDetail;
