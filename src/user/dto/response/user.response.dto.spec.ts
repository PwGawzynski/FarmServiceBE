import { Equal } from '../../../../TypeScriptHelpers/dtoToInterface';
import { UserResponseDto } from './user.response.dto';
import { UserResponseBase } from '../../../../FarmServiceTypes/User/Responses';

const test: Equal<
  Omit<UserResponseDto, 'personalData' | 'address' | 'account'>,
  Omit<UserResponseBase, 'personalData' | 'address' | 'account'>
> = true;

describe('Dose UserResponseDto match UserResponseBase', () => {
  it('should be tru', () => {
    expect(test).toBe(true);
  });
});
