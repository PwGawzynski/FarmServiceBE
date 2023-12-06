import { Exclude, Expose } from 'class-transformer';
import { UserPersonalDataResponseDto } from '../../../user/dto/response/userPersonalData.response.dto';
import { EventType } from '../../../../FarmServiceTypes/Notification/Enums';

export class NotificationWhiteList {
  constructor(partial: Partial<NotificationWhiteList>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: string;

  @Expose()
  shortInfo: string;

  @Expose()
  eventType: EventType;

  @Expose()
  createdAt?: Date;

  @Expose()
  description: string;

  @Expose()
  causer: UserPersonalDataResponseDto;
}

@Exclude()
export class NotificationResponseDto extends NotificationWhiteList {
  constructor(partial: Partial<NotificationResponseDto>) {
    super(partial);
    Object.assign(this, partial);
  }
}
