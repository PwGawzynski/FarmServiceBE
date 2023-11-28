import { ConflictException, Injectable } from '@nestjs/common';
import { CrateTaskCollection } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { Company } from '../company/entities/company.entity';
import {
  ResponseCode,
  ResponseObject,
} from '../../FarmServiceTypes/respnse/responseGeneric';
import { CreateTaskResponseDto } from './dto/response/create-task.response.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';

@Injectable()
export class TaskService {
  async create(createTaskDtos: CrateTaskCollection, company: Company) {
    const newTasks = createTaskDtos.tasks.map(
      (createTaskDto) =>
        new Task({
          ...createTaskDto,
          field: Promise.resolve(createTaskDto.field),
          worker: Promise.resolve(createTaskDto.worker),
          order: Promise.resolve(createTaskDto.order),
          company: Promise.resolve(company),
        }),
    );
    for (const task of newTasks) {
      await task._shouldBeValidWhenCreate(company);
      task.save();
    }
    return {
      code: ResponseCode.ProcessedCorrect,
    } as ResponseObject;
  }

  async all(company: Company) {
    return Promise.all(
      (await company.tasks).map(
        async (task) =>
          new CreateTaskResponseDto({
            ...task,
            field: {
              ...(await task.field),
              addressId: (await (await task.field).address).id,
            },
            worker: {
              ...(await task.worker),
              personalData: await (await (await task.worker).user).personalData,
              address: await (await (await task.worker).user).address,
              email: (await (await task.worker).user).email,
            },
          }),
      ),
    );
  }

  async allByOrder(company: Company, id: string) {
    const filtered = (await company.tasks).filter(
      async (task) => (await task.order).id === id,
    );
    return Promise.all(
      filtered.map(
        async (task) =>
          new CreateTaskResponseDto({
            ...task,
            field: {
              ...(await task.field),
              addressId: (await (await task.field).address).id,
            },
            worker: {
              ...(await task.worker),
              personalData: await (await (await task.worker).user).personalData,
              address: await (await (await task.worker).user).address,
              email: (await (await task.worker).user).email,
            },
          }),
      ),
    );
  }

  async delete(deleteTaskDto: DeleteTaskDto, company: Company) {
    const isAssignedToCompany =
      (await (await deleteTaskDto.task).company).id === company.id;
    if (!isAssignedToCompany)
      throw new ConflictException('This task is not assigned to yours company');
    deleteTaskDto.task.remove();
    return { code: ResponseCode.ProcessedCorrect } as ResponseObject;
  }
}
