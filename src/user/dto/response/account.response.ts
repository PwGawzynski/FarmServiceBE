import { Exclude, Expose } from 'class-transformer';
import { Theme } from '../../../../FarmServiceTypes/Account/Constants';

class AccountWhiteList {
  constructor(partial: Partial<AccountResponseDto>) {
    Object.assign(this, partial);
  }
  @Expose()
  theme: Theme;
  @Expose()
  activationCode: string;
}

@Exclude()
export class AccountResponseDto extends AccountWhiteList {
  id: string;
  isActivated: boolean;
  constructor(partial: Partial<AccountResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}

type ClassFields<T> = {
  [K in keyof T]: T[K];
};

export type AccountResponseWhiteList = ClassFields<AccountWhiteList>;
