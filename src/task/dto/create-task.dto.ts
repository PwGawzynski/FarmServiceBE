import { Order } from '../../order/entities/order.entity';
import { Worker } from '../../worker/entities/worker.entity';
import { Field } from '../../field/entities/field.entity';
import { IsArray, IsEnum, IsUUID, ValidateNested } from 'class-validator';
import { FindOrReject } from '../../../ClassValidatorCustomDecorators/FindOrReject.decorator';
import { TaskType } from '../../../FarmServiceTypes/Task/Enums';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsUUID()
  @FindOrReject(Order, { message: 'Cannot find given order' })
  order: Order;
  @IsUUID()
  @FindOrReject(Worker, { message: 'Cannot find given worker' })
  worker: Worker;
  @IsUUID()
  @FindOrReject(Field, { message: 'Cannot find given field' })
  field: Field;

  @IsEnum(TaskType)
  type: TaskType;

  *[Symbol.iterator]() {
    yield this.order;
    yield this.field;
    yield this.type;
    yield this.worker;
  }
}

export class CrateTaskCollection {
  @IsArray()
  @Type(() => CreateTaskDto)
  @ValidateNested()
  tasks: Array<CreateTaskDto>;
}
