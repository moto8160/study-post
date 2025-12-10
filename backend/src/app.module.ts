import { Module } from '@nestjs/common';
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './common/prisma/prisma.module';

@Module({
  imports: [PrismaModule, PostsModule, UsersModule, AuthModule],
})
export class AppModule {}
