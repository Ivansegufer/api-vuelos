import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'vuelossecret', // TODO: Configurarlo en variable de entorno
    });
  }

  public async validate(payload: any) {
    const { email, usuario } = payload;
    return {
      email,
      usuario,
    };
  }
}
