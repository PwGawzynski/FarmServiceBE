import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { User } from '../src/user/entities/user.entity';
import { printWarnToConsole } from '../Helpers/printWarnToConsole';
import { UserRole } from '../FarmServiceTypes/User/Enums';

function throwError(msg: string) {
  printWarnToConsole('CAUSER DOES NOT EXIST IN DB', 'USER-DECORATOR');
  throw new HttpException('Unauthorised. ' + msg, HttpStatus.UNAUTHORIZED);
}

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
    const isAccountActivated = !!(await user.account).isActivated;
    if (!user && isAccountActivated) {
      printWarnToConsole('CAUSER DOES NOT EXIST IN DB', 'USER-DECORATOR');
      throw new HttpException('Unauthorised', HttpStatus.UNAUTHORIZED);
    }
    return user;
  },
);

/**
 * This decorator checks if causer is owner, if yes returned owner with fetched company data
 *  @throws error when causer is not owner, or doesn't have any company
 */
export const GetOwnedCompany = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = await User.findOne({
      where: {
        id: request.user.id,
      },
    });
    const isAccountActivated = (await user.account).isActivated;
    const isOwner = user.role === UserRole.owner;

    if (!user && isAccountActivated)
      throwError('User does not exist, or account is not activated');

    if (!isOwner) throwError('Unauthorised. You do not have owner role');

    if (!(await user.company))
      throwError("Unauthorised. Ypu don't have registered company");

    return user;
  },
);
