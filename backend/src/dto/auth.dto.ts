import { IsNotEmpty, IsString } from 'class-validator';

export class CredentialsDto {
  @IsNotEmpty({ message: 'メールアドレスが未入力です' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'パスワードが未入力です' })
  @IsString()
  password: string;
}
