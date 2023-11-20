import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsEnum, IsNumber, Max, Min } from 'class-validator';
import OrderConstants from '../../../FarmServiceTypes/Order/Constants';
import { OrderStatus } from '../../../FarmServiceTypes/Order/Enums';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(OrderConstants.MIN_PRICE_PER_UNIT)
  @Max(OrderConstants.MAX_PRICE_PER_UNIT)
  pricePerUnit: number;
}
