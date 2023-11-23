import { OmitBaseEntityAndId } from '../../../SelfTypes/OmitBaseEntity';
import { Worker } from '../entities/worker.entity';
import { IsUUID } from 'class-validator';
import { FindOrReject } from '../../../ClassValidatorCustomDecorators/FindOrReject.decorator';
import { User } from '../../user/entities/user.entity';

export class CreateWorkerDto
  implements
    OmitBaseEntityAndId<
      Worker,
      'company' | 'user' | 'tasks' | '_shouldNotExist'
    >
{
  @IsUUID()
  @FindOrReject(User, { message: 'Cannot find given user' })
  user: User;

  *[Symbol.iterator]() {
    yield this.user;
  }
}
