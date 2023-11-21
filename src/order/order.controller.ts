import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';
import { Owner } from '../../decorators/auth.decorators';
import { GetOwnedCompany } from '../../decorators/user.decorators';
import { Company } from '../company/entities/company.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Owner()
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @GetOwnedCompany() company: Company,
  ) {
    return this.orderService.create(createOrderDto, company);
  }

  @Get('all')
  @Owner()
  async getAll(@GetOwnedCompany() company: Company) {
    return this.orderService.getAll(company);
  }
}
