import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from 'generated/prisma';
import { UserDetailDto, UserListDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserListDto[]> {
    return this.prisma.user.findMany({
      select: { id: true, name: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<UserDetailDto> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        createdAt: true,
        posts: { orderBy: { createdAt: 'desc' } },
      },
    });
    const totalStudyTime = user.posts.reduce((sum, post) => sum + post.studyTime, 0);
    return { ...user, posts: user.posts, totalStudyTime };
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return await this.prisma.user.create({
      data: { ...dto, password: hashedPassword }, //ハッシュ化値で上書き
    });
  }

  async update(userId: number, dto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return await this.prisma.user.update({
      where: { id: userId },
      data: { ...dto, password: hashedPassword },
    });
  }

  async delete(userId: number) {
    await this.prisma.user.delete({ where: { id: userId } });
  }

  // IDからユーザーを取得
  private async findUserById(id: number): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({ where: { id } });
  }
}
