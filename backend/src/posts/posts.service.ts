import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { PrismaService } from 'src/prisma.service';
import { Post, Post as PostModel } from 'generated/prisma';
import { PostResponse } from './dto/post-response.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PostResponse[]> {
    return this.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        date: true,
        studyTime: true,
        updatedAt: true,
        user: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<PostResponse> {
    return this.prisma.post.findUniqueOrThrow({
      select: {
        id: true,
        title: true,
        content: true,
        date: true,
        studyTime: true,
        updatedAt: true,
        user: { select: { id: true, name: true } },
      },
      where: { id },
    });
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

  async update(id: number, userId: number, updatePostDto: UpdatePostDto): Promise<PostModel> {
    const post = await this.findPostByID(id);
    this.assertOwnPost(post, userId);
    return this.prisma.post.update({
      where: { id },
      data: {
        ...updatePostDto,
        date: new Date(updatePostDto.date),
      },
    });
  }

  async delete(id: number, userId: number): Promise<PostModel> {
    const post = await this.findPostByID(id);
    // this.assertOwnPost(post, userId);
    return this.prisma.post.delete({
      where: { id },
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
