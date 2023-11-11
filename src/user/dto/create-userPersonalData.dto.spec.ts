import { Equal } from '../../../TypeScriptHelpers/dtoToInterface';
import { CreateUserPersonalDataDto } from './create-userPersonalData.dto';
import { CreatUserPersonalDataReqI } from '../../../FarmServiceTypes/UserPersonalData/Requests';

const test: Equal<CreateUserPersonalDataDto, CreatUserPersonalDataReqI> = true;

describe('Are CreateUserPersonalDataDto  match CreatUserPersonalDataReqI', () => {
  it('should be true', () => {
    expect(test).toBe(true);
  });
});
