import { UserRole } from '../../../../FarmServiceTypes/User/RegisterNewUserDataDtoInterfaceMobi';
import { UserPersonalDataResponseDto } from './userPersonalData.response.dto';
import { AddressResponseDto } from '../../../commonEntities/commonEntitiesDTOs/response/address.response.dto';
import { AccountResponseDto } from './account.response';

export class UserResponseDto {
  email: string;
  role: UserRole;
  personalData: UserPersonalDataResponseDto;
  address: AddressResponseDto;
  account: AccountResponseDto;
  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
