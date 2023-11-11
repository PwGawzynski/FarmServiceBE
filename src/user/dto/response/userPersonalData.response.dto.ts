import { Exclude, Expose } from 'class-transformer';
import { GetUserPersonalDataResponse } from '../../../../FarmServiceTypes/respnse/UserService/GetUserDataResponse';

export class UserPersonalDataWhiteList {
  constructor(partial: Partial<UserPersonalDataWhiteList>) {
    Object.assign(this, partial);
  }

  @Expose()
  name: string;
  @Expose()
  surname: string;
  @Expose()
  phoneNumber: string;
}

export class UserPersonalDataResponseDto
  extends UserPersonalDataWhiteList
  implements GetUserPersonalDataResponse
{
  @Exclude()
  id: string;

  constructor(partial: Partial<UserPersonalDataResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
