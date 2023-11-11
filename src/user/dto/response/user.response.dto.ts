import { UserRole } from '../../../../FarmServiceTypes/User/RegisterNewUserDataDtoInterfaceMobi';
import { UserPersonalDataResponseDto } from './userPersonalData.response.dto';
import { AddressResponseDto } from '../../../commonEntities/dto/response/address.response.dto';
import { AccountResponseDto } from './account.response';
import { GetUserDataResponse } from '../../../../FarmServiceTypes/respnse/UserService/GetUserDataResponse';

export class UserResponseDto implements GetUserDataResponse {
  email: string;
  role: UserRole;
  personalData: UserPersonalDataResponseDto;
  address: AddressResponseDto;
  account: AccountResponseDto;
  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
