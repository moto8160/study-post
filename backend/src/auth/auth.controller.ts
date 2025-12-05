import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post()
  async signIn(@Body() credentialsDto: CredentialsDto): Promise<{ accessToken: string }> {
    return await this.authservice.signIn(credentialsDto);
  }
}
