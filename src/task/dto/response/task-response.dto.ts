import { Exclude, Expose } from 'class-transformer';
import { TaskType } from '../../../../FarmServiceTypes/Task/Enums';
import { FieldResponseDto } from '../../../field/dto/response/field.response';
import { WorkerResponseDto } from '../../../worker/dto/response/worker-response.dto';

export class CreateTaskResponseWhiteList {
  constructor(partial: Partial<CreateTaskResponseWhiteList>) {
    Object.assign(this, partial);
  }
  @Expose()
  id: string;

  @Expose()
  isDone?: boolean;

  @Expose()
  type: TaskType;

  @Expose()
  createdAt: Date;

  @Expose()
  openedAt?: Date;

  @Expose()
  closedAt?: Date;

  @Expose()
  field: FieldResponseDto;

  @Expose()
  worker?: WorkerResponseDto;
}

@Exclude()
export class TaskResponseDto extends CreateTaskResponseWhiteList {
  constructor(partial: Partial<TaskResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
