import { Exclude, Expose } from 'class-transformer';
import { AddressResponseDto } from '../../../commonEntities/dto/response/address.response.dto';

export class CompanyAddressResponseWhiteList {
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

@Exclude()
export class CompanyAddressResponseDto extends CompanyAddressResponseWhiteList {
  constructor(partial: Partial<CompanyAddressResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
