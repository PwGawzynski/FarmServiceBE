import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { User } from '../src/user/entities/user.entity';
import { UserRole } from '../FarmServiceTypes/User/Enums';

function matchRoles(roles: Array<UserRole>, userRole: UserRole) {
  if (!roles.includes(userRole))
    throw new ForbiddenException(
      undefined,
      `Your role: ${UserRole[
        userRole
      ].toUpperCase()} is not granted to perform this action`,
    );
  else return true;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get('roles', context.getHandler());
    console.log(roles, 'elloo');
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    return matchRoles(roles, user.role);
  }
}
