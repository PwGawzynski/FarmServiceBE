import { Exclude } from 'class-transformer';

export class AddressResponseDto {
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
