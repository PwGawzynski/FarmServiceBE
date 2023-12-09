import { Injectable } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { Company } from '../company/entities/company.entity';
import { Machine } from './entities/machine.entity';
import {
  ResponseCode,
  ResponseObject,
} from '../../FarmServiceTypes/respnse/responseGeneric';
import { MachineResponseDto } from './dto/response/machine.response.dto';

@Injectable()
export class MachineService {
  async create(createMachineDto: CreateMachineDto, company: Company) {
    const newMachine = new Machine();
    newMachine.licensePlate = createMachineDto.licensePlate;
    newMachine.name = createMachineDto.name;
    newMachine.company = Promise.resolve(company);
    await newMachine._shouldNotExist();
    newMachine.save();
    return {
      code: ResponseCode.ProcessedWithoutConfirmationWaiting,
      payload: new MachineResponseDto(newMachine),
    } as ResponseObject;
  }
}
