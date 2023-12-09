import { Controller, Post, Body } from '@nestjs/common';
import { MachineService } from './machine.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { GetOwnedCompany } from '../../decorators/user.decorators';
import { Company } from '../company/entities/company.entity';

@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post()
  create(
    @Body() createMachineDto: CreateMachineDto,
    @GetOwnedCompany() company: Company,
  ) {
    return this.machineService.create(createMachineDto, company);
  }
}
