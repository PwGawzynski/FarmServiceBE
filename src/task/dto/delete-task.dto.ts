import { IsUUID } from 'class-validator';
import { FindOrReject } from '../../../ClassValidatorCustomDecorators/FindOrReject.decorator';
import { Task } from '../entities/task.entity';

export class DeleteTaskDto {
  @IsUUID()
  @FindOrReject(Task, { message: 'Cannot find task with given id' })
  task: Task;
}
