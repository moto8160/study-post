import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CredentialsDto } from 'src/dto/auth.dto';
import { JwtPayload } from 'src/common/auth/jwt.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto: CredentialsDto): Promise<{ accessToken: string }> {
    //JS-オブジェクトの分割代入
    // const email = credentialsDto.email;
    // const password = credentialsDto.password;
    const { email, password } = dto;

    const user = await this.prisma.user.findFirst({ where: { email } }); //emailをユニークにしないと・・・

    if (!user) {
      throw new NotFoundException('emailに紐づくユーザーなしだよ');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('パスワードがちがう!!!');
    }

    const payload: JwtPayload = { sub: user.id, username: user.name };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
