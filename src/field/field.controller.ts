import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FieldService } from './field.service';
import { AllRoles, Owner } from '../../decorators/auth.decorators';
import { GetOwnedCompany, GetUser } from '../../decorators/user.decorators';
import { User } from '../user/entities/user.entity';
import { CreateFieldDto } from './dto/create-field.dto';
import { ApiTags } from '@nestjs/swagger';
import { Company } from '../company/entities/company.entity';

@ApiTags('Field')
@Controller('field')
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @Post()
  @Owner()
  async createByOwner(
    @Body() createFieldDto: CreateFieldDto,
    @GetUser() user: User,
  ) {
    return this.fieldService.createByOwner(createFieldDto, user);
  }

  @Get()
  @Owner()
  async getOne(@Query('PLid') PLid: string) {
    return this.fieldService.getOne(PLid);
  }

  @Get('all-for-order')
  @AllRoles()
  async getAllFields(
    @Query('id') id: string,
    @GetOwnedCompany() company: Company,
  ) {
    return this.fieldService.getAllFields(company, id);
  }
}
