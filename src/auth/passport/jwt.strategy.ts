import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.KEYSECRET,
    });
  }

  async validate(payload: {
    sub: string;
    username: string;
    companyId: string;
  }) {
    return {
      userId: payload.sub,
      email: payload.username,
      companyId: payload.companyId,
    };
  }
}
