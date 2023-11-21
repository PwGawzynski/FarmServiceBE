import { Exclude, Expose } from 'class-transformer';
import { UserPersonalDataResponseDto } from '../../../user/dto/response/userPersonalData.response.dto';

export class WorkerResponseWhiteList {
  constructor(partial: Partial<WorkerResponseDto>) {
    Object.assign(this, partial);
  }
  @Expose()
  personalData: UserPersonalDataResponseDto;
}

@Exclude()
export class WorkerResponseDto extends WorkerResponseWhiteList {
  constructor(partial: Partial<WorkerResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
