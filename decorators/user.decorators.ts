import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { User } from '../src/user/entities/user.entity';
import { printWarnToConsole } from '../Helpers/printWarnToConsole';

export function throwError(msg: string) {
  printWarnToConsole('CAUSER DOES NOT EXIST IN DB', 'USER-DECORATOR');
  throw new HttpException('Unauthorised. ' + msg, HttpStatus.UNAUTHORIZED);
}

/**
 * This decorator allow to inject into function param userEntity
 */
export const GetUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const user: User = ctx.switchToHttp().getRequest().user;
    return user;
  },
);

/**
 * This decorator checks if causer is owner, if yes returned owner with fetched company data
 *  @throws error when causer is not owner, or doesn't have any company
 */
export const GetOwnedCompany = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest().user;
    if (!(await user.company))
      throwError("Unauthorised. Ypu don't have registered company");
    return user;
  },
);
