import { OmitBaseEntityAndId } from '../../../SelfTypes/OmitBaseEntity';
import { Company } from '../entities/company.entity';
import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  IsUUID,
  Length,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from '../../commonEntities/commonEntitiesDTOs/create-address.dto';
import { Type } from 'class-transformer';
import { FindOrReject } from '../../../ClassValidatorCustomDecorators/FindOrReject.decorator';
import { User } from '../../user/entities/user.entity';

export class CreateCompanyDto
  implements OmitBaseEntityAndId<Company, 'address' | 'owner'>
{
  @IsString({ message: 'Company must be a string' })
  @IsNotEmpty({ message: 'Company name cannot be empty string' })
  @Length(1, 100, {
    message:
      'Company name cannot be longer than 100 characters and shorter than one',
  })
  name: string;

  @IsNotEmptyObject(
    { nullable: false },
    { message: 'Address cannot be empty object' },
  )
  @IsDefined()
  @Type(() => CreateAddressDto)
  @ValidateNested()
  address: CreateAddressDto;

  @IsUUID()
  @FindOrReject(User, { message: 'Cannot find user with given ID' })
  owner: string;
}
