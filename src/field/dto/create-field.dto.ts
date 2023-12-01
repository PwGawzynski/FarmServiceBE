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
import { Type } from 'class-transformer';
import { getDateFormatDescriptionFor } from '../../../Helpers/common descriptionGetters';
import FieldConstants from '../../../FarmServiceTypes/Field/Constants';
import { CreateFieldAddressDto } from '../../field-address/dto/create-field-address.dto';
import { FindOrReject } from '../../../ClassValidatorCustomDecorators/FindOrReject.decorator';
import { Order } from '../../order/entities/order.entity';

// TODO change to create only by latitude and longitude
export class CreateFieldDto {
  @IsString({ message: 'Polish system id must be a string' })
  @Length(FieldConstants.POLISH_ID_MIN_LEN, FieldConstants.POLISH_ID_MAX_LEN)
  /**
   * checks if matches format 02034_2.0008.241
   */
  @Matches(/^\d{5,8}_\d+\.\d{4}\.\d{3}(\/\d+_BUD)?$/, {
    message: 'Polish system id must fulfill pattern 02034_2.0008.241',
  })
  @IsNotEmpty({ message: 'Polish system id must be not empty strings' })
  polishSystemId: string;

  @IsNumber({
    maxDecimalPlaces: FieldConstants.AREA_MAX_DECIMAL_PLACES,
  })
  @IsPositive({ message: 'Area cannot be negative number' })
  @Max(FieldConstants.AREA_MAX_VALUE)
  @Min(FieldConstants.AREA_MIN_VALUE)
  area: number;

  @IsDateString(undefined, {
    message: getDateFormatDescriptionFor('dateOfCollectionData'),
  })
  @IsNotEmpty({ message: 'date of collection data cannot be empty' })
  dateOfCollectionData: Date;

  @IsNotEmptyObject(
    { nullable: false },
    { message: 'Address cannot be empty object' },
  )
  @IsDefined()
  @Type(() => CreateFieldAddressDto)
  @ValidateNested()
  address: CreateFieldAddressDto;

  @IsUUID()
  @FindOrReject(Order, { message: 'Cannot find given order' })
  order: Order;

  *[Symbol.iterator]() {
    yield this.polishSystemId;
    yield this.area;
    yield this.dateOfCollectionData;
    yield this.address;
    yield this.order;
  }
}
