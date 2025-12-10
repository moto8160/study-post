import { ForbiddenException, Injectable } from '@nestjs/common';
import { Comment, Post, Post as PostModel } from 'generated/prisma';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateCommentDto } from 'src/dto/comment.dto';
import { CreatePostDto, UpdatePostDto } from 'src/dto/post.dto';
import { PostDetail, PostList } from 'src/types/post.type';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PostList[]> {
    return this.prisma.post.findMany({
      include: {
        user: { select: { id: true, name: true } },
        _count: { select: { comments: true, likes: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(postId: number, userId: number): Promise<PostDetail> {
    const post = await this.prisma.post.findUniqueOrThrow({
      include: {
        user: { select: { id: true, name: true } },
        _count: { select: { comments: true, likes: true } },
        comments: {
          include: {
            user: { select: { id: true, name: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
        likes: { where: { userId } },
      },
      where: { id: postId },
    });
    const isLiked = post.likes.length > 0;
    return { ...post, isLiked }; //postをスプレッドで展開
  }

  async createPost(dto: CreatePostDto, userId: number): Promise<PostModel> {
    return this.prisma.post.create({
      data: {
        ...dto, //JS-スプレッド構文でDTOの中身を展開(プロパティ：値)
        date: new Date(dto.date), //上書き（stringで受け取ってdateに変換）
        userId, //userId: userId
      },
    });
  }

  async update(id: number, userId: number, dto: UpdatePostDto): Promise<PostModel> {
    const post = await this.findPostByID(id);
    this.assertOwnPost(post, userId);
    return this.prisma.post.update({
      where: { id },
      data: {
        ...dto,
        date: new Date(dto.date),
      },
    });
  }

  async delete(id: number, userId: number) {
    const post = await this.findPostByID(id);
    this.assertOwnPost(post, userId);
    await this.prisma.post.delete({ where: { id } });
  }

  async createComment(postId: number, userId: number, dto: CreateCommentDto): Promise<Comment> {
    return this.prisma.comment.create({
      data: {
        postId,
        userId,
        content: dto.content,
      },
    });
  }

  async createLike(postId: number, userId: number) {
    await this.prisma.like.create({
      data: {
        postId,
        userId,
      },
    });
  }

  async deleteLike(postId: number, userId: number) {
    await this.prisma.like.delete({
      where: {
        postId_userId: { postId, userId }, //複合主キー
      },
    });
  }

  // idからPostを取得
  private async findPostByID(id: number): Promise<Post> {
    return this.prisma.post.findUniqueOrThrow({ where: { id } }); //404 NotFound
  }

  // 自分の投稿かをチェック
  private assertOwnPost(post: Post, userId: number) {
    if (post.userId !== userId) {
      throw new ForbiddenException(); //403 権限エラー
    }
  }

  // findAll(): PostEntity[] {
  //   return this.posts;
  // }

  // findOne(id: number): PostEntity {
  //   const post = this.posts.find((post) => post.id === id); //javaScript-find関数、アロー関数を使用
  //   if (!post) {
  //     throw new NotFoundException(`Post with id:${id} not found`); //messageに任意の値
  //   }
  //   return post;
  // }

  // create(createPostDto: CreatePostDto): PostEntity {
  //   const newPost: PostEntity = {
  //     id: this.posts.length + 1,
  //     title: createPostDto.title,
  //     content: createPostDto.content,
  //     time: createPostDto.time,
  //     date: createPostDto.date,
  //   };

  //   this.posts.push(newPost);
  //   return newPost;
  // }

  // update(id: number, updatePostDto: UpdatePostDto): PostEntity {
  //   const post = this.findOne(id);
  //   post.title = updatePostDto.title;
  //   post.content = updatePostDto.content;
  //   post.time = updatePostDto.time;
  //   post.date = updatePostDto.date;
  //   return post;
  // }

  // updatePatch(id: number, updatePatchPostDto: UpdatePatchPostDto): PostEntity {
  //   const post = this.findOne(id);
  //   post.title = updatePatchPostDto.title ?? post.title; //??-値があるときだけ更新
  //   post.content = updatePatchPostDto.content ?? post.content;
  //   post.time = updatePatchPostDto.time ?? post.time;
  //   post.date = updatePatchPostDto.date ?? post.date;
  //   return post;
  // }

  // delete(id: number): void {
  //   this.posts = this.posts.filter((post) => post.id !== id);
  // }
}
