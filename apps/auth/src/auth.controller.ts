import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { LoginDto } from '@app/common';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @MessagePattern({ cmd: 'validate_user' })
  async validateUser(data: LoginDto) {
    return this.authService.validateUser(data.username, data.password);
  }

  @MessagePattern({ cmd: 'login' })
  async login(user: any) {
    return this.authService.login(user);
  }

  @MessagePattern({ cmd: 'validate_token' })
  async validateToken(token: string) {
    return this.authService.validateToken(token);
  }
}
