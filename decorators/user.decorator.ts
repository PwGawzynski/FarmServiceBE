import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { User } from '../src/user/entities/user.entity';
import { printWarnToConsole } from '../Helpers/printWarnToConsole';

/**
 * This decorator allow to inject into function param userEntity
 */
export const GetUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = await User.findOne({
      where: {
        id: request.user.id,
      },
    });
    if (!user) {
      printWarnToConsole('CAUSER DOES NOT EXIST IN DB', 'USER-DECORATOR');
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return user;
  },
);
