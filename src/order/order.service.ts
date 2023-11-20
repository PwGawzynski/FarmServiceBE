import { ConflictException, Injectable } from '@nestjs/common';
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
    if (!((await createOrderDto.client.clientAt)?.id === company.id))
      throw new ConflictException(
        'User given as client is not client of company',
      );
    const newOrder = new Order({
      ...createOrderDto,
      company: Promise.resolve(company),
      client: Promise.resolve(createOrderDto.client),
    });
    newOrder.save();
    return {
      code: ResponseCode.ProcessedCorrect,
      payload: new OrderResponseDto({
        ...newOrder,
        clientId: (await newOrder.client).id,
      }),
    } as ResponseObject<OrderResponseDto>;
  }
}
