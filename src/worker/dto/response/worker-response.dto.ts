import { Exclude, Expose } from 'class-transformer';
import { UserPersonalDataResponseDto } from '../../../user/dto/response/userPersonalData.response.dto';
import { Position, Status } from '../../../../FarmServiceTypes/Worker/Enums';
import { AddressResponseDto } from '../../../commonEntities/dto/response/address.response.dto';

export class WorkerResponseWhiteList {
  constructor(partial: Partial<WorkerResponseDto>) {
    Object.assign(this, partial);
  }
  @Expose()
  id: string;

  @Expose()
  personalData: UserPersonalDataResponseDto;

  @Expose()
  address: AddressResponseDto;

  @Expose()
  position?: Position;

  @Expose()
  status?: Status;

  @Expose()
  email: string;
}

@Exclude()
export class WorkerResponseDto extends WorkerResponseWhiteList {
  constructor(partial: Partial<WorkerResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}

@Exclude()
export class WorkerIdResponseDto {
  constructor(partial: Partial<WorkerIdResponseDto>) {
    Object.assign(this, partial);
  }
  @Expose()
  id: string;

  @Expose()
  companyId: string;
}
