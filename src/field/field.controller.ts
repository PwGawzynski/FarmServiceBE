import { Body, Controller, Get, Post } from '@nestjs/common';
import { FieldService } from './field.service';
import { Client } from '../../decorators/auth.decorators';
import { GetUser } from '../../decorators/user.decorators';
import { User } from '../user/entities/user.entity';
import { CreateFieldDto } from './dto/create-field.dto';
import { ApiTags } from '@nestjs/swagger';
import { use } from 'passport';

@ApiTags('Field')
@Controller('field')
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @Post('by-field-owner')
  @Client()
  async createByOwner(
    @Body() createFieldDto: CreateFieldDto,
    @GetUser() user: User,
  ) {
    return this.fieldService.createByOwner(createFieldDto, user);
  }

  @Get('all')
  @Client()
  async getAllFields(@GetUser() user: User) {
    return this.fieldService.getAllFields(user);
  }
}
