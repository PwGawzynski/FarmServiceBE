import { OmitBaseEntityAndId } from '../../../SelfTypes/OmitBaseEntity';
import { Order } from '../entities/order.entity';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import OrderConstants from '../../../FarmServiceTypes/Order/Constants';
import { ServiceType } from '../../../FarmServiceTypes/Order/Enums';
import { getDateFormatDescriptionFor } from '../../../Helpers/common descriptionGetters';
export class CreateOrderDto
  implements OmitBaseEntityAndId<Order, 'totalArea' | 'company'>
{
  @IsString({ message: 'Order name must be an string' })
  @Length(OrderConstants.NAME_MIN_LEN, OrderConstants.NAME_MAX_LEN)
  name: string;

  @IsEnum(ServiceType)
  serviceType: ServiceType;

  @IsDateString(undefined, {
    message: getDateFormatDescriptionFor('performanceDate'),
  })
  performanceDate: Date;

  @IsOptional()
  @IsString({ message: 'Additional info must be an string' })
  @Length(
    OrderConstants.ADDITIONAL_INFO_MIN_LEN,
    OrderConstants.ADDITIONAL_INFO_MAX_LEN,
  )
  additionalInfo: string;

  *[Symbol.iterator]() {
    yield this.name;
    yield this.serviceType;
    yield this.performanceDate;
    yield this.additionalInfo;
  }
}
