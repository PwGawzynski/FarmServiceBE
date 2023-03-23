import {Body, Controller, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request} from "express";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Method to register new user
   * @param createUserDto - DTO with register data
   * @param req - req obj from express
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createUserDto : CreateUserDto, @Req() req : Request){
    console.log(createUserDto);
    return this.userService.create(createUserDto, req);
  }

  @Get('activate/:activationCode')
  activate(@Param('activationCode') activationCode){
    console.log(activationCode);
    return this.userService.activate(activationCode);
  }
}
