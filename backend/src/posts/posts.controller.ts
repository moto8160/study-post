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
import { Post as PostModel } from 'generated/prisma';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { JwtRequest } from 'src/auth/types/jwtRequest';
import { PostsResponse } from './types/PostsResponse';

// @UseGuards(JwtAuthGuard) //全ルートにガード適用
@Controller('posts')
export class PostsController {
  // private readonly postsService: PostsService;
  // constructor(postsService: PostsService) {
  //   this.postsService = postsService;
  // }
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<PostsResponse[]> {
    return await this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PostsResponse> {
    return await this.postsService.findOne(id);
  }

  @Post()
  // createPost(@Body() createPostDto: CreatePostDto, @Request() req: JwtRequest) {
  //   const userId = req.user.userId; //リクエストからユーザーIDを取得
  //   return this.postsService.createPost(createPostDto, userId);
  // }
  createPost(@Body() createPostDto: CreatePostDto): Promise<PostModel> {
    const userId = 1;
    return this.postsService.createPost(createPostDto, userId);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: JwtRequest,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostModel> {
    // const userId = req.user.userId;
    const userId = 1;
    return await this.postsService.update(id, userId, updatePostDto);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    // @Request() req: JwtRequest,
  ): Promise<PostModel> {
    // const userId = req.user.userId;
    const userId = 1;
    return await this.postsService.delete(id, userId);
  }
}
