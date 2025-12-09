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

// export type PostList = {
//   id: number;
//   userId: number;
//   title: string;
//   content: string;
//   date: Date;
//   studyTime: number;
//   createdAt: Date;
//   updatedAt: Date;
//   user: {
//     id: number;
//     name: string;
//   };
//   _count: {
//     comments: number;
//   };
// };

// export type PostDetail = PostList & {
//   comments: {
//     id: number;
//     postId: number;
//     userId: number;
//     content: string;
//     createdAt: Date;
//     updatedAt: Date;
//     user: {
//       id: number;
//       name: string;
//     };
//   }[];
// };
