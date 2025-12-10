import { IsDateString, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty({ message: 'タイトルが未入力です' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '内容が未入力です' })
  content: string;

  @Min(0.5, { message: '時間が未入力です' })
  @IsNumber()
  studyTime: number;

  @IsDateString()
  @IsNotEmpty({ message: '日付が未入力です' })
  date: string;
}

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty({ message: 'タイトルが未入力です' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '内容が未入力です' })
  content: string;

  @Min(0.5, { message: '時間が未入力です' })
  @IsNumber()
  studyTime: number;

  @IsDateString()
  @IsNotEmpty({ message: '日付が未入力です' })
  date: string;
}
