import { OmitBaseEntityAndId } from '../../../SelfTypes/OmitBaseEntity';
import { Field } from '../entities/field.entity';
import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Length,
  Matches,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from '../../commonEntities/commonEntitiesDTOs/create-address.dto';
import { Type } from 'class-transformer';
import { FindOrReject } from '../../../ClassValidatorCustomDecorators/FindOrReject.decorator';
import { User } from '../../user/entities/user.entity';

export class CreateFieldDto
  implements
    OmitBaseEntityAndId<Field, 'address' | 'appearsInOrders' | 'owner'>
{
  @IsString({ message: 'Polish system id must be a string' })
  @Length(1, 40)
  /**
   * checks if matches format 02034_2.0008.241
   */
  @Matches(/^\d{5}_\d+\.\d{4}\.\d{3}$/)
  @IsNotEmpty({ message: 'Polish system id must be not empty strings' })
  polishSystemId: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive({ message: 'Area cannot be negative number' })
  @Max(65535)
  @Min(0)
  area: number;

  @IsDateString(undefined, {
    message:
      'date of collection data must meet the requirements of ISO8601 date pattern',
  })
  @IsNotEmpty({ message: 'date of collection data cannot be empty' })
  dateOfCollectionData: Date;

  @IsNotEmptyObject(
    { nullable: false },
    { message: 'Address cannot be empty object' },
  )
  @IsDefined()
  @Type(() => CreateAddressDto)
  @ValidateNested()
  address: CreateAddressDto;

  @IsUUID()
  @FindOrReject(User, { message: 'Cannot find given Owner' })
  owner_id: string;
}
