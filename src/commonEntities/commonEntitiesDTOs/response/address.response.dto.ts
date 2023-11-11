import { Exclude, Expose } from 'class-transformer';
import { GetUserAddressDataResponse } from '../../../../FarmServiceTypes/respnse/UserService/GetUserDataResponse';

export class AddressWhiteList {
  constructor(partial: Partial<AddressResponseDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  city: string;

  @Expose()
  county: string;

  @Expose()
  voivodeship?: string;

  @Expose()
  street?: string;

  @Expose()
  houseNumber: string;

  @Expose()
  apartmentNumber?: string;

  @Expose()
  postalCode: string;
}

export class AddressResponseDto
  extends AddressWhiteList
  implements GetUserAddressDataResponse
{
  @Exclude()
  id: string;

  constructor(partial: Partial<AddressResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
