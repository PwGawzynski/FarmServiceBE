import { Exclude } from 'class-transformer';
import { GetUserPersonalDataResponse } from '../../../../FarmServiceTypes/respnse/UserService/GetUserDataResponse';

export class UserPersonalDataResponseDto
  implements GetUserPersonalDataResponse
{
  @Exclude()
  id: string;
  name: string;

  surname: string;

  phoneNumber: string;

  constructor(partial: Partial<UserPersonalDataResponseDto>) {
    Object.assign(this, partial);
  }
}
