import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../FarmServiceTypes/User/Enums';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guards';

/**
 * Provides checking if action causer has owner role.
 * @constructor
 */
export const Owner = () => SetMetadata('roles', [UserRole.owner]);
export const Worker = () => SetMetadata('roles', [UserRole.worker]);

export const Public = () => SetMetadata(JwtAuthGuard.IS_PUBLIC_PATH, true);
export const AllowOnlyByToken = () =>
  SetMetadata(JwtAuthGuard.IS_CREATE_USER_ACTION, true);
