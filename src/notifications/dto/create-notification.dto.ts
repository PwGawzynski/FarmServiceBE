import { OmitBaseEntityAndId } from '../../../SelfTypes/OmitBaseEntity';
import { Notification } from '../entities/notification.entity';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { FindOrReject } from '../../../ClassValidatorCustomDecorators/FindOrReject.decorator';
import { User } from '../../user/entities/user.entity';
import { EventType } from '../../../FarmServiceTypes/notification/notification';

export class CreateNotificationDto
  implements OmitBaseEntityAndId<Notification, 'causer' | 'recipients'>
{
  @IsString({ message: 'schort info must be a string type' })
  // TODO Check if without isNotEmpty validation will be still the same because length should provide check if is not empty <1,100> etc
  @IsNotEmpty({ message: 'Schort info cannot be empty string' })
  @Length(1, 100, {
    message: 'Schort info string length must be in <1,100> scope',
  })
  schortInfo: string;

  @IsEnum(EventType)
  eventType: EventType;

  @IsString({ message: 'Description must be a string type' })
  @IsNotEmpty({ message: 'Description cannot be empty string' })
  // TODO add in env constants for max length for each column and use it here and in entity, create fn to get description message from env plus min max
  @Length(1, 10000, {
    message: 'Description string length must be in scope <1,10000>',
  })
  description: string;

  @IsUUID()
  @FindOrReject(User, { message: 'Cannot find user with given id' })
  causer: string;

  @IsArray({ message: 'Recipients must be an array of UserID type' })
  @IsUUID(undefined, { each: true })
  @FindOrReject(User, {
    each: true,
    message: (validationArguments) =>
      `Cannot find user with ${validationArguments.value} id`,
  })
  recipients: Array<string>;
}
