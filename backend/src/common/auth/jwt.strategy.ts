import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload, JwtUser } from './jwt.type';

// JWT認証用のストラテジー
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Authorization ヘッダからトークン取得
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // JWTの有効期限チェック
      ignoreExpiration: false,
      // JWT署名の秘密鍵
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  // JWTから必要な情報を抽出
  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(payload: JwtPayload): Promise<JwtUser> {
    return { userId: payload.sub, username: payload.username };
  }
}
