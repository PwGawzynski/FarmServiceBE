import { Exclude } from 'class-transformer';
import { GetUserAddressDataResponse } from '../../../../FarmServiceTypes/respnse/UserService/GetUserDataResponse';

export class AddressResponseDto implements GetUserAddressDataResponse {
  @Exclude()
  id: string;
  city: string;

  county: string;

  voivodeship?: string;

  street?: string;

  houseNumber: string;

  apartmentNumber?: string;

  postalCode: string;

  constructor(partial: Partial<AddressResponseDto>) {
    Object.assign(this, partial);
  }
}
