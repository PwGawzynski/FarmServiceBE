import { Equal } from '../../../TypeScriptHelpers/dtoToInterface';
import { CreateAccountDto } from './create-account.dto';
import { CreateAccountReqI } from '../../../FarmServiceTypes/Account/Requests';

const test: Equal<CreateAccountDto, CreateAccountReqI> = true;

describe('Does CreateAccountDto match CreateAccountReqI', () => {
  it('should be true', () => {
    expect(test).toBe(true);
  });
});
