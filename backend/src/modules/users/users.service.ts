import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'generated/prisma';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUserDto } from 'src/dto/user.dto';
import { UserDetail, UserList } from 'src/types/user.type';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserList[]> {
    return this.prisma.user.findMany({
      select: { id: true, name: true, createdAt: true, updatedAt: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<UserDetail> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        posts: {
          include: {
            user: {
              select: { id: true, name: true },
            },
            _count: {
              select: { comments: true, likes: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    const totalStudyTime = user.posts.reduce((sum, post) => sum + post.studyTime, 0);
    return { ...user, posts: user.posts, totalStudyTime };
  }

  async createUser(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    await this.prisma.user.create({
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
}
