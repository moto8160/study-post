import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Comment, Post as PostModel } from 'generated/prisma';
import { PostDetailResponse, PostListResponse } from 'src/types/post.type';
import { JwtAuthGuard } from 'src/common/auth/jwt-auth.guard';
import type { JwtRequest } from 'src/common/auth/jwt.type';
import { CreatePostDto, UpdatePostDto } from 'src/dto/post.dto';
import { CreateCommentDto } from 'src/dto/comment.dto';

@Controller('posts')
export class PostsController {
  // private readonly postsService: PostsService;
  // constructor(postsService: PostsService) {
  //   this.postsService = postsService;
  // }
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<PostListResponse[]> {
    return this.postsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: JwtRequest,
  ): Promise<PostDetailResponse> {
    const userId = req.user.userId; //JWTからユーザーID取得
    return this.postsService.findOne(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() dto: CreatePostDto, @Request() req: JwtRequest): Promise<PostModel> {
    const userId = req.user.userId;
    return this.postsService.createPost(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: JwtRequest,
    @Body() dto: UpdatePostDto,
  ): Promise<PostModel> {
    const userId = req.user.userId;
    return this.postsService.update(id, userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @Request() req: JwtRequest) {
    const userId = req.user.userId;
    return this.postsService.delete(id, userId);
  }

  // コメント機能
  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  async createComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateCommentDto,
    @Request() req: JwtRequest,
  ): Promise<Comment> {
    const userId = req.user.userId;
    return this.postsService.createComment(id, userId, dto);
  }

  // いいね機能
  @UseGuards(JwtAuthGuard)
  @Post(':id/likes')
  async createLike(@Param('id', ParseIntPipe) id: number, @Request() req: JwtRequest) {
    const userId = req.user.userId;
    await this.postsService.createLike(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/likes')
  async deleteLike(@Param('id', ParseIntPipe) id: number, @Request() req: JwtRequest) {
    const userId = req.user.userId;
    await this.postsService.deleteLike(id, userId);
  }
}
