import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { User } from './entities/user.entity';
import { GetOwnedCompany, GetUser } from '../../decorators/user.decorators';
import { AllowOnlyByToken, Public } from '../../decorators/auth.decorators';
import { ApiTags } from '@nestjs/swagger';
import { Company } from '../company/entities/company.entity';

@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Method to register new user
   * @param createUserDto - DTO with register data
   * @param req - req obj from express
   */
  @Post()
  @AllowOnlyByToken()
  create(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    console.log(createUserDto, 'TEST');
    return this.userService.create(createUserDto, req);
  }

  @Get('activate/:activationCode')
  @Public()
  activate(@Param('activationCode') activationCode: string) {
    console.log(activationCode);
    return this.userService.activate(activationCode);
  }

  @Get('me')
  async getUserByToken(@GetUser() user: User) {
    return this.userService.getUserAccountData(user);
  }

  @Get('personal_data')
  async persona_Data(@GetUser() user: User) {
    return this.userService.personal_data(user);
  }

  @Get('address_data')
  async address_data(@GetUser() user: User) {
    return this.userService.address_data(user);
  }
}
