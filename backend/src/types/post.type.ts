import { Prisma } from 'generated/prisma';

// Prismaが型を自動生成
export type PostList = Prisma.PostGetPayload<{
  include: {
    user: { select: { id: true; name: true } };
    _count: { select: { comments: true; likes: true } };
  };
}>;

export type PostDetail = Prisma.PostGetPayload<{
  include: {
    user: { select: { id: true; name: true } };
    _count: { select: { comments: true; likes: true } };
    comments: {
      include: {
        user: { select: { id: true; name: true } };
      };
    };
    likes: true;
  };
}> & {
  isLiked: boolean; //prisma生成とは別で追加
};

export type PostListResponse = PostList;
export type PostDetailResponse = PostDetail;
