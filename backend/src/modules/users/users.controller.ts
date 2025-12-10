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
import { UsersService } from './users.service';
import { User } from 'generated/prisma';
import { UserDetailResponse, UserListResponse } from 'src/types/user.type';
import { CreateUserDto } from 'src/dto/user.dto';
import type { JwtRequest } from 'src/common/auth/jwt.type';
import { JwtAuthGuard } from 'src/common/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserListResponse[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDetailResponse> {
    return this.usersService.findOne(id);
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    await this.usersService.createUser(dto);
  }

  // フロント未実装
  @Put()
  @UseGuards(JwtAuthGuard)
  async update(@Request() req: JwtRequest, @Body() dto: CreateUserDto): Promise<User> {
    return await this.usersService.update(req.user.userId, dto);
  }

  // フロント未実装
  @Delete()
  @UseGuards(JwtAuthGuard)
  async delete(@Request() req: JwtRequest) {
    return await this.usersService.delete(req.user.userId);
  }
}
