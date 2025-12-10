import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'コメントが未入力です' })
  @IsString()
  content: string;
}
