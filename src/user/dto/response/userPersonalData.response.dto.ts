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

@Exclude()
export class UserPersonalDataResponseDto
  extends UserPersonalDataWhiteList
  implements GetUserPersonalDataResponse
{
  constructor(partial: Partial<UserPersonalDataResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
