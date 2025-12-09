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
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { Comment, Post as PostModel } from 'generated/prisma';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { JwtRequest } from 'src/auth/types/jwtRequest';
import { PostDetail, PostList } from './types/postResponse';
import { CreateCommentDto } from 'src/comments/dto/createComment.dto';

@Controller('posts')
export class PostsController {
  // private readonly postsService: PostsService;
  // constructor(postsService: PostsService) {
  //   this.postsService = postsService;
  // }
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<PostList[]> {
    return this.postsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: JwtRequest,
  ): Promise<PostDetail> {
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
