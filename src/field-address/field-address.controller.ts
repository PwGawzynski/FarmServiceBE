import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FieldAddressService } from './field-address.service';
import { CreateFieldAddressDto } from './dto/create-field-address.dto';
import { UpdateFieldAddressDto } from './dto/update-field-address.dto';

@Controller('field-address')
export class FieldAddressController {
  constructor(private readonly fieldAddressService: FieldAddressService) {}

  @Post()
  create(@Body() createFieldAddressDto: CreateFieldAddressDto) {
    return this.fieldAddressService.create(createFieldAddressDto);
  }

  @Get()
  findAll() {
    return this.fieldAddressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldAddressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFieldAddressDto: UpdateFieldAddressDto) {
    return this.fieldAddressService.update(+id, updateFieldAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldAddressService.remove(+id);
  }
}
