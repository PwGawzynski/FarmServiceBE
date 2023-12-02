import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { FieldService } from './field.service';
import { AllRoles, Owner } from '../../decorators/auth.decorators';
import { GetOwnedCompany } from '../../decorators/user.decorators';
import { CreateFieldDto } from './dto/create-field.dto';
import { ApiTags } from '@nestjs/swagger';
import { Company } from '../company/entities/company.entity';
import { GetDataFromXLMDto } from './dto/get-dataFromXLM.dto';

@ApiTags('Field')
@Controller('field')
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @Post()
  @Owner()
  async createByOwner(@Body() createFieldDto: CreateFieldDto) {
    return this.fieldService.createByOwner(createFieldDto);
  }

  @Post('xmlTranslate')
  @Owner()
  async getDataFromXLM(@Body() xlm: GetDataFromXLMDto) {
    return this.fieldService.getDataFromXLM(xlm);
  }

  @Get('PLID')
  @Owner()
  async getOnePLId(@Query('PLid') PLid: string) {
    return this.fieldService.getOnePlId(PLid);
  }

  @Get()
  @Owner()
  async getOne(@Query('id') id: string) {
    return this.fieldService.getOne(id);
  }

  @Delete()
  @Owner()
  async delete(@Query('id') id: string) {
    return this.fieldService.delete(id);
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
