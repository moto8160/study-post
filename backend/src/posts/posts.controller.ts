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
import { PostResponse } from './dto/post-response.dto';

@Controller('posts')
export class PostsController {
  // private readonly postsService: PostsService;
  // constructor(postsService: PostsService) {
  //   this.postsService = postsService;
  // }
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<PostResponse[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PostResponse> {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() dto: CreatePostDto, @Request() req: JwtRequest): Promise<PostModel> {
    const userId = req.user.userId; //JWTからユーザーID取得
    return this.postsService.createPost(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: JwtRequest,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostModel> {
    const userId = req.user.userId; //JWTからユーザーID取得
    return this.postsService.update(id, userId, updatePostDto);
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
