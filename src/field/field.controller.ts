import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FieldService } from './field.service';
import { AllRoles, Owner } from '../../decorators/auth.decorators';
import { GetOwnedCompany } from '../../decorators/user.decorators';
import { CreateFieldDto } from './dto/create-field.dto';
import { ApiTags } from '@nestjs/swagger';
import { Company } from '../company/entities/company.entity';

@ApiTags('Field')
@Controller('field')
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @Post()
  @Owner()
  async createByOwner(@Body() createFieldDto: CreateFieldDto) {
    return this.fieldService.createByOwner(createFieldDto);
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
