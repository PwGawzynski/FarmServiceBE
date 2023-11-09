import { OmitBaseEntityAndId } from '../../../SelfTypes/OmitBaseEntity';
import { Order } from '../entities/order.entity';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';
import OrderConstants from '../../../FarmServiceTypes/Order/Constants';
import {
  OrderStatus,
  ServiceType,
} from '../../../FarmServiceTypes/Order/Enums';
import { getDateFormatDescriptionFor } from '../../../Helpers/common descriptionGetters';
import { FindOrReject } from '../../../ClassValidatorCustomDecorators/FindOrReject.decorator';
import { User } from '../../user/entities/user.entity';

export class CreateOrderDto
  implements OmitBaseEntityAndId<Order, 'client' | 'totalArea'>
{
  @IsString({ message: 'Order name must be an string' })
  @Length(OrderConstants.ORDER_NAME_MIN_LEN, OrderConstants.ORDER_NAME_MAX_LEN)
  name: string;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsEnum(ServiceType)
  serviceType: ServiceType;

  @IsDateString(undefined, {
    message: getDateFormatDescriptionFor('performanceDate'),
  })
  performanceDate: Date;

  @IsOptional()
  @IsString({ message: 'Additional info must be an string' })
  @Length(
    OrderConstants.ORDER_ADDITIONAL_INFO_MIN_LEN,
    OrderConstants.ORDER_ADDITIONAL_INFO_MAX_LEN,
  )
  additionalInfo: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(OrderConstants.ORDER_MIN_PRICE_PER_UNIT)
  @Max(OrderConstants.ORDER_MAX_PRICE_PER_UNIT)
  pricePerUnit: number;

  @IsUUID()
  @FindOrReject(User, { message: 'Cannot find user with given id' })
  client: string;
}
