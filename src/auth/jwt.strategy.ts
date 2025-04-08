import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken() as StrategyOptions['jwtFromRequest'],
      secretOrKey: 'RAHASIA123', // Ganti untuk produksi
    });
  }

  validate(payload: { sub: string }) {
    return { userId: payload.sub };
  }
}

import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {}
