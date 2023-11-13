import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { printWarnToConsole } from '../../Helpers/printWarnToConsole';

/**
 * This cals is used for implement passport JWT strategy
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('secretSign'),
    });
  }

  /**
   * This method is in charge of validate access token, checks its expiration date, validate signature and assign user Object to req
   * @param payload decrypted Access token payload
   * @param done fn. called when validation done
   * @throws UnauthorizedException if token is not validate
   */
  async validate(payload, done: (error, user) => void) {
    if (!payload || !payload.userId) done(new UnauthorizedException(), false);

    const user = await User.findOne({
      where: {
        id: payload.userId,
      },
    });
    const isAccountActivated = !!(await user.account).isActivated;
    if (!user && isAccountActivated) {
      printWarnToConsole('CAUSER DOES NOT EXIST IN DB', 'USER-DECORATOR');
      throw new HttpException('Unauthorised', HttpStatus.UNAUTHORIZED);
    }

    return done(null, user);
  }
}
