import { Exclude } from 'class-transformer';

export class UserPersonalDataResponseDto {
  @Exclude()
  id: string;
  name: string;

  surname: string;

  phoneNumber: string;

  constructor(partial: Partial<UserPersonalDataResponseDto>) {
    Object.assign(this, partial);
  }
}
