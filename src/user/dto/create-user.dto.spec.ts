import { Equal } from '../../../TypeScriptHelpers/dtoToInterface';
import { CreateUserDto } from './create-user.dto';
import { CreateUserReqI } from '../../../FarmServiceTypes/User/Requests';

const test: Equal<
  Omit<CreateUserDto, 'accountData' | 'userPersonalData' | 'addressData'>,
  Omit<CreateUserReqI, 'accountData' | 'userPersonalData' | 'addressData'>
> = true;

describe('Does CreateUserDto match CreateUserReqI', () => {
  it('should be true', () => {
    expect(test).toBe(true);
  });
});
