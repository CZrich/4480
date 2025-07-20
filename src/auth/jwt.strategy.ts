// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

 constructor(config: ConfigService) {
    if (!config) {
      throw new Error('ConfigService is not provided');
    }
  const jwtSecret = config.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
   }
   console.log('JWT_SECRET:', jwtSecret); // Debugging line to check the secret
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

    

  async validate(payload: any) {
    return { 

      sub: payload.sub,
      email: payload.email,
      role: payload.role, // Assuming you want to include the role in the payload

     };
  }
}
