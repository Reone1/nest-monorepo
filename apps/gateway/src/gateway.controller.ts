import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard, LoginDto } from '@app/common';

@Controller()
export class GatewayController {
  constructor(
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
    @Inject('ITEM_SERVICE') private itemClient: ClientProxy,
  ) {}

  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) {
    const user = await firstValueFrom(
      this.authClient.send({ cmd: 'validate_user' }, loginDto),
    );
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authClient.send({ cmd: 'login' }, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('items')
  async getItems() {
    return this.itemClient.send({ cmd: 'get_items' }, {});
  }
}
