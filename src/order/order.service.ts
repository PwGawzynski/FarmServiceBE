import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Company } from '../company/entities/company.entity';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  ResponseCode,
  ResponseObject,
} from '../../FarmServiceTypes/respnse/responseGeneric';
import { OrderResponseDto } from './dto/response/order.response.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from '../../FarmServiceTypes/Order/Enums';

@Injectable()
export class OrderService {
  async create(createOrderDto: CreateOrderDto, company: Company) {
    const newOrder = new Order({
      ...createOrderDto,
      company: Promise.resolve(company),
    });
    newOrder.save().catch((e) => {
      throw e;
    });
    return {
      code: ResponseCode.ProcessedCorrect,
    } as ResponseObject;
  }

  async getAll(company: Company) {
    const orders = await company.orders;
    return orders.map((o) => new OrderResponseDto(o));
  }

  async update(updateData: UpdateOrderDto, company: Company) {
    const order = updateData.order;
    const isCompanies = (await company.orders).find((o) => (o.id = order.id));
    if (!isCompanies)
      throw new UnauthorizedException(
        'You cannot manage order which bot belonging to yours company',
      );
    order.pricePerUnit = updateData.pricePerUnit;
    order.status = OrderStatus.Done;
    order.save();
    return { code: ResponseCode.ProcessedCorrect } as ResponseObject;
  }
}
