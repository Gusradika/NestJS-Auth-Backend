import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.validateUser(email, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const token = await this.jwtService.signAsync({ sub: user.id });
    return { access_token: token, user: { id: user.id, email: user.email } };
  }

  async register(email: string, password: string) {
    const user = await this.userService.create(email, password);
    return { user: { id: user.id, email: user.email } };
  }
}
