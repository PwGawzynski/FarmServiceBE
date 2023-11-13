import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../FarmServiceTypes/User/Enums';

export const Owner = () => SetMetadata('roles', [UserRole.owner]);
export const Worker = () => SetMetadata('roles', [UserRole.worker]);
