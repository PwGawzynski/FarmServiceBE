import { UserPersonalDataResponseDto } from './userPersonalData.response.dto';
import { AddressResponseDto } from '../../../commonEntities/dto/response/address.response.dto';
import { AccountResponseDto } from './account.response';
import { UserRole } from '../../../../FarmServiceTypes/User/Enums';
import { Exclude, Expose } from 'class-transformer';

export class UserResponseWhiteListDto {
  constructor(partial: Partial<UserResponseWhiteListDto>) {
    Object.assign(this, partial);
  }
  @Expose()
  email: string;
  @Expose()
  role: UserRole;
  @Expose()
  personalDataId: string;
  @Expose()
  addressId: string;
  @Expose()
  accountId: string;
}

@Exclude()
export class UserResponseDto extends UserResponseWhiteListDto {
  constructor(partial: Partial<UserResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
