import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { AddressDataTransferObjectI } from '../../../FarmServiceTypes/User/RegisterNewUserDataDtoInterfaceMobi';
import AddressConstants from '../../../FarmServiceTypes/Address/Constants';

/**
 * This DTO represent all address entities in application
 */
export class CreateAddressDto implements AddressDataTransferObjectI {
  @IsString({
    message: 'City must be string type',
  })
  @IsNotEmpty({
    message: 'City cannot be empty string',
  })
  @Length(AddressConstants.CITY_MIN_LEN, AddressConstants.CITY_MIN_LEN)
  city: string;

  @IsString({
    message: 'County must be string type',
  })
  @IsNotEmpty({
    message: 'County cannot be empty string',
  })
  @Length(AddressConstants.COUNTY_MIN_LEN, AddressConstants.COUNTY_MAX_LEN)
  county: string;

  @IsString({
    message: 'Voivodeship must be string type',
  })
  @IsNotEmpty({
    message: 'Voivodeship cannot be empty string',
  })
  @Length(
    AddressConstants.VOIVODESHIP_MIN_LEN,
    AddressConstants.VOIVODESHIP_MAX_LEN,
  )
  @IsOptional()
  voivodeship?: string;

  @IsString({
    message: 'Street must be string type',
  })
  @IsNotEmpty({
    message: 'Street cannot be empty string',
  })
  @Length(AddressConstants.STREET_MIN_LEN, AddressConstants.STREET_MAX_LEN)
  @IsOptional()
  street?: string;

  @IsString({
    message: 'House number must be string type',
  })
  @IsNotEmpty({
    message: 'House number cannot be empty string',
  })
  @Length(AddressConstants.HOUSE_NR_MIN_LEN, AddressConstants.HOUSE_NR_MAX_LEN)
  houseNumber: string;

  @IsString({
    message: 'Apartment number must be string type',
  })
  @IsNotEmpty({
    message: 'Apartment number cannot be empty string',
  })
  @Length(
    AddressConstants.APARTMENT_NR_MIN_LEN,
    AddressConstants.APARTMENT_NR_MAX_LEN,
  )
  @IsOptional()
  apartmentNumber?: string;

  @IsString({
    message: 'Postal code must be string type',
  })
  @IsNotEmpty({
    message: 'Postal code cannot be empty string',
  })
  @Matches('^[0-9]{2}-[0-9]{3}$')
  @Length(AddressConstants.POSTAL_CODE_LEN, AddressConstants.POSTAL_CODE_LEN)
  postalCode: string;
}
