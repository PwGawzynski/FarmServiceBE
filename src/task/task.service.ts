import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { Company } from '../company/entities/company.entity';
import {
  ResponseCode,
  ResponseObject,
} from '../../FarmServiceTypes/respnse/responseGeneric';

@Injectable()
export class TaskService {
  async create(createTaskDto: CreateTaskDto, company: Company) {
    const newTask = new Task({
      ...createTaskDto,
      field: Promise.resolve(createTaskDto.field),
      worker: Promise.resolve(createTaskDto.worker),
      order: Promise.resolve(createTaskDto.order),
    });
    await newTask._shouldBeValid(company);
    newTask.save();
    return {
      code: ResponseCode.ProcessedCorrect,
    } as ResponseObject;
  }
}
