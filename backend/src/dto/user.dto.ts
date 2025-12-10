import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'ユーザー名が未入力です' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'メールアドレスが未入力です' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'パスワードが未入力です' })
  password: string;
}
