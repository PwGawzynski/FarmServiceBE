import { OmitBaseEntityAndId } from '../../../SelfTypes/OmitBaseEntity';
import { Notification } from '../entities/notification.entity';
import { IsEnum, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';
import { FindOrReject } from '../../../ClassValidatorCustomDecorators/FindOrReject.decorator';
import { User } from '../../user/entities/user.entity';
import { EventType } from '../../../FarmServiceTypes/Notification/Enums';
import NotificationConstants from '../../../FarmServiceTypes/Notification/Constants';

export class CreateNotificationDto
  implements OmitBaseEntityAndId<Notification, 'causer'>
{
  @IsString({ message: 'schort info must be a string type' })
  // TODO Check if without isNotEmpty validation will be still the same because length should provide check if is not empty <1,100> etc
  @IsNotEmpty({ message: 'Schort info cannot be empty string' })
  @Length(
    NotificationConstants.SCHORT_INFO_MIN_LEN,
    NotificationConstants.SCHORT_INFO_MAX_LEN,
    {
      message: 'Schort info string length must be in <1,100> scope',
    },
  )
  schortInfo: string;

  @IsEnum(EventType)
  eventType: EventType;

  @IsString({ message: 'Description must be a string type' })
  @IsNotEmpty({ message: 'Description cannot be empty string' })
  // TODO add in env constants for max length for each column and use it here and in entity, create fn to get description message from env plus min max
  @Length(
    NotificationConstants.DESCRIPTION_MIN_LEN,
    NotificationConstants.DESCRIPTION_MAX_LEN,
    {
      message: 'Description string length must be in scope <1,10000>',
    },
  )
  description: string;

  @IsUUID()
  @FindOrReject(User, { message: 'Cannot find user with given id' })
  causer: User;

  /*@IsArray({ message: 'Recipients must be an array of UserID type' })
  @IsUUID(undefined, { each: true })
  @FindOrReject(User, {
    each: true,
    message: (validationArguments) =>
      `Cannot find user with ${validationArguments.value} id`,
  })
  recipients: Array<string>;*/
}
