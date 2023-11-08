import { OmitBaseEntityAndId } from '../../../SelfTypes/OmitBaseEntity';
import { FieldAddress } from '../entities/field-address.entity';
import {
  IsDefined,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
import { CreateFieldDto } from '../../field/dto/create-field.dto';
import { Type } from 'class-transformer';

export class CreateFieldAddressDto
  implements OmitBaseEntityAndId<FieldAddress, 'field'>
{
  @IsString({
    message: 'City must be a string type',
  })
  @Length(1, 70)
  @IsNotEmpty({ message: 'City cannot be empty' })
  city: string;

  @IsString({ message: 'County must be a string type' })
  @Length(1, 70)
  @IsNotEmpty({ message: 'County cannot be empty' })
  county: string;

  @IsString({ message: 'Voivodeship must be a string type' })
  @Length(1, 50)
  @IsNotEmpty({ message: 'Voivodeship cannot be empty' })
  voivodeship: string;

  @IsString({ message: 'Postal code must be a string type' })
  @Length(6, 6)
  @IsNotEmpty({ message: 'Postal code cannot be empty' })
  @Matches(/^[0-9]{2}-[0-9]{3}$/)
  postalCode: string;

  @IsString({ message: 'Longitude code must be a string type' })
  @Length(1, 15)
  @IsLongitude()
  @IsNotEmpty({ message: 'Longitude code cannot be empty' })
  longitude: string;

  @IsString({ message: 'Latitude code must be a string type' })
  @Length(1, 15)
  @IsLatitude()
  @IsNotEmpty({ message: 'Latitude code cannot be empty' })
  latitude: string;

  @IsNotEmptyObject()
  @IsDefined()
  @Type(() => CreateFieldDto)
  @ValidateNested()
  field: CreateFieldDto;
}
