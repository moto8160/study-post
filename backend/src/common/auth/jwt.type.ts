import { Request } from '@nestjs/common';

export interface JwtRequest extends Request {
  user: JwtUser;
}

export type JwtUser = {
  userId: number;
  username: string;
};

export type JwtPayload = {
  sub: number;
  username: string;
};
