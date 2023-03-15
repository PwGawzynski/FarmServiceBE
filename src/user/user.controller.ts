import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request} from "express";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createUserDto : CreateUserDto, @Req() req : Request){
    console.log(createUserDto);
    return this.userService.create(createUserDto, req);
  }
}
