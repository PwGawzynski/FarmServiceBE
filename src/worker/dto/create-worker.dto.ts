import { OmitBaseEntityAndId } from '../../../SelfTypes/OmitBaseEntity';
import { Worker } from '../entities/worker.entity';
import { IsUUID } from 'class-validator';
import { FindOrReject } from '../../../ClassValidatorCustomDecorators/FindOrReject.decorator';
import { Company } from '../../company/entities/company.entity';
import { User } from '../../user/entities/user.entity';

export class CreateWorkerDto
  implements OmitBaseEntityAndId<Worker, 'company' | 'user' | 'tasks'>
{
  @IsUUID()
  @FindOrReject(Company, { message: 'Cannot find company with given id' })
  company: string;

  @IsUUID()
  @FindOrReject(User, { message: 'Cannot find given user' })
  user: string;
}
