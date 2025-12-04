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
import { CreateUserDto } from './dto/createUser.dto';
import { User } from 'generated/prisma';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { JwtRequest } from 'src/auth/types/jwtRequest';
import { UserDetailDto, UserListDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  async findAll(): Promise<UserListDto[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserDetailDto> {
    return await this.usersService.findOne(id);
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(dto);
  }

  @Put()
  // @UseGuards(JwtAuthGuard)
  async update(@Request() req: JwtRequest, @Body() dto: CreateUserDto): Promise<User> {
    return await this.usersService.update(req.user.userId, dto);
  }

  @Delete()
  // @UseGuards(JwtAuthGuard)
  async delete(@Request() req: JwtRequest) {
    return await this.usersService.delete(req.user.userId);
  }
}
