import { Injectable } from '@nestjs/common';
import { Company } from '../company/entities/company.entity';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  ResponseCode,
  ResponseObject,
} from '../../FarmServiceTypes/respnse/responseGeneric';
import { OrderResponseDto } from './dto/response/order.response.dto';

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
}
