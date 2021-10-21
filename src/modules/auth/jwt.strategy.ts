import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_API_SECRET } from '../../config/environments';
import { UserService } from '../users/user.service';
import { AuthUser } from '../../common/auth/auth-user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_API_SECRET,
    });
  }

  async validate(payload: any) {
    // Fetch the current user to add the companyId in the user model.
    const user = await this.userService.findUser(
      {
        email: payload.email,
      },
      {},
      {
        populate: ['company'],
      },
    );

    return new AuthUser(
      user._id!.toString(),
      payload.email,
      user.company._id?.toString(),
    );
  }
}
