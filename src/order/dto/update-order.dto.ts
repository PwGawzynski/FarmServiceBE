import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';
import OrderConstants from '../../../FarmServiceTypes/Order/Constants';
import { OrderStatus } from '../../../FarmServiceTypes/Order/Enums';
import { Order } from '../entities/order.entity';
import { FindOrReject } from '../../../ClassValidatorCustomDecorators/FindOrReject.decorator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @FindOrReject(Order, { message: 'Cannot find order with given status' })
  order: Order;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(OrderConstants.MIN_PRICE_PER_UNIT)
  @Max(OrderConstants.MAX_PRICE_PER_UNIT)
  pricePerUnit: number;
}
