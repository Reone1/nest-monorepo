import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '@app/common';

@Injectable()
export class AuthService {
  private readonly users: User[] = [
    { id: 1, username: 'john' },
    { id: 2, username: 'maria' },
  ];

  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = this.users.find((u) => u.username === username);
    if (
      user &&
      (await bcrypt.compare(password, await bcrypt.hash('password', 10)))
    ) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = this.users.find((u) => u.id === payload.sub);
      if (!user) {
        return { isValid: false };
      }
      return { isValid: true, userId: user.id, username: user.username };
    } catch (error) {
      return { isValid: false };
    }
  }
}
