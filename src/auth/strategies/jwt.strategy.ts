import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { User } from "../../users/entities/user.entity";
import { envs } from "../../config";
import { JwtPayload } from "../interfaces/jwt.interface";
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

  constructor(
    private readonly authService: AuthService,
  ) {
    super( {
      secretOrKey: envs.jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    } );
  }

  async validate ( payload: JwtPayload ): Promise<User> {
    
    const { id } = payload;

    const user = await this.authService.validateUser( id );

    return user;

  }

}