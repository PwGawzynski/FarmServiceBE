import { Theme } from '../../../../FarmServiceTypes/User/RegisterNewUserDataDtoInterfaceMobi';
import { Exclude } from 'class-transformer';

export class AccountResponseDto {
  @Exclude()
  id: string;
  theme: Theme;
  @Exclude()
  activationCode: string;
  @Exclude()
  isActivated: boolean;

  constructor(partial: Partial<AccountResponseDto>) {
    Object.assign(this, partial);
  }
}
