import { Equal } from '../../../TypeScriptHelpers/dtoToInterface';
import { CreateNotificationDto } from './create-notification.dto';
import { CreateNotificationReqI } from '../../../FarmServiceTypes/Notification/Requests';

const test: Equal<
  Omit<CreateNotificationDto, 'causer'>,
  Omit<CreateNotificationReqI, 'causer'>
> = true;

describe('Does CreateNotificationReqI matches CreateNotificationDto', () => {
  it('should be equal', () => {
    expect(test).toBe(true);
  });
});
