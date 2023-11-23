import { Exclude, Expose } from 'class-transformer';
import { TaskType } from '../../../../FarmServiceTypes/Task/Enums';
import { FieldResponseDto } from '../../../field/dto/response/field.response';

export class CreateTaskResponseWhiteList {
  constructor(partial: Partial<CreateTaskResponseWhiteList>) {
    Object.assign(this, partial);
  }
  @Expose()
  isDone?: boolean;

  @Expose()
  type: TaskType;

  @Expose()
  openedAt?: Date;

  @Expose()
  closedAt?: Date;

  @Expose()
  field: FieldResponseDto;
}

@Exclude()
export class CreateTaskResponseDto extends CreateTaskResponseWhiteList {
  constructor(partial: Partial<CreateTaskResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
