import { ConflictException, Injectable } from '@nestjs/common';
import { AssignMachinesDto, CrateTaskCollection } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { Company } from '../company/entities/company.entity';
import {
  ResponseCode,
  ResponseObject,
} from '../../FarmServiceTypes/respnse/responseGeneric';
import { TaskResponseDto } from './dto/response/task-response.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { User } from '../user/entities/user.entity';
import { FieldResponseDto } from '../field/dto/response/field.response';
import { FieldAddressResponseDto } from '../field-address/dto/response/field-address.response.dto';
import { OrderStatus } from '../../FarmServiceTypes/Order/Enums';
import { NotificationsService } from '../notifications/notifications.service';
import { EventType } from '../../FarmServiceTypes/Notification/Enums';
import { MachineResponseDto } from '../machine/dto/response/machine.response.dto';

@Injectable()
export class TaskService {
  constructor(private readonly notification: NotificationsService) {}

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
      (await task.order).status = OrderStatus.Processing;
      (await task.order).save();
      console.log(await task.order);
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
          new TaskResponseDto({
            ...task,
            field: {
              ...(await task.field),
              address: new FieldAddressResponseDto(
                await (
                  await task.field
                ).address,
              ),
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
    const test = await Promise.all(
      (await company.tasks).map(async (task) => (await task.order).id === id),
    );
    const filtered = (await company.tasks).filter((task, index) => test[index]);
    return await Promise.all(
      filtered.map(async (task) => {
        return new TaskResponseDto({
          ...task,
          field: {
            ...(await task.field),
            address: new FieldAddressResponseDto({
              ...(await (await task.field)?.address),
            }),
          },
          worker: {
            ...(await task.worker),
            personalData: await (await (await task.worker).user).personalData,
            address: await (await (await task.worker).user).address,
            email: (await (await task.worker).user).email,
          },
        });
      }),
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

  async getAssignedTasks(user: User) {
    const worker = await user.worker;
    console.log(worker, 'WORKER TEST');
    const tasks = await worker.tasks;
    console.log(tasks, 'RES');
    const responseTasks = await Promise.all(
      tasks
        .filter((t) => !t.isDone)
        .map(
          async (t) =>
            new TaskResponseDto({
              ...t,
              field: new FieldResponseDto({
                ...(await t.field),
                address: new FieldAddressResponseDto(
                  await (
                    await t.field
                  ).address,
                ),
              }),
              worker: undefined,
            }),
        ),
    );
    return {
      code: ResponseCode.ProcessedCorrect,
      payload: responseTasks,
    } as ResponseObject<TaskResponseDto[]>;
  }

  async open(id: string, user: User) {
    const worker = await user.worker;
    const task = (await worker.tasks).find((t) => t.id === id);
    if (!task) throw new ConflictException('Given Task Does not exist');
    task.openedAt = new Date();
    task.save();
    const notificationDescription = `${user.id} Opened Task ${
      task.id
    } at ${new Date().toLocaleDateString()}`;
    this.notification.create(
      user,
      notificationDescription,
      'Started Task',
      EventType.TaskOpened,
    );
    return { code: ResponseCode.ProcessedCorrect } as ResponseObject;
  }

  async close(id: string, user: User) {
    const worker = await user.worker;
    const task = (await worker.tasks).find((t) => t.id === id);
    if (!task) throw new ConflictException('Given Task Does not exist');
    task.closedAt = new Date();
    task.save();
    const notificationDescription = `${user.id} Closed Task ${
      task.id
    } at ${new Date().toLocaleDateString()}`;
    this.notification.create(
      user,
      notificationDescription,
      'Closed Task',
      EventType.TaskClosed,
    );
    return { code: ResponseCode.ProcessedCorrect } as ResponseObject;
  }

  async assignMachines(assignationData: AssignMachinesDto) {
    const task = assignationData.taskId;
    task.machines = Promise.resolve([...assignationData.machines]);
    task.save();
    return {
      code: ResponseCode.ProcessedWithoutConfirmationWaiting,
    } as ResponseObject;
  }

  async getMachines(taskId: string) {
    const task = await Task.findOne({ where: { id: taskId } });
    if (!task) throw new ConflictException('Cannot find given task');
    console.log(
      await Promise.all(
        (await task.machines).map((m) => new MachineResponseDto(m)),
      ),
      taskId,
      'WIELEKIATES',
    );
    return {
      code: ResponseCode.ProcessedCorrect,
      payload: await Promise.all(
        (await task.machines).map((m) => new MachineResponseDto(m)),
      ),
    } as ResponseObject<MachineResponseDto[]>;
  }
}
