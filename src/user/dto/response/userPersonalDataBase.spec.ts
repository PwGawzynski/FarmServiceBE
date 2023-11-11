import { Equal } from '../../../../TypeScriptHelpers/dtoToInterface';
import { UserPersonalDataWhiteList } from './userPersonalData.response.dto';
import { PersonalDataBase } from '../../../../FarmServiceTypes/UserPersonalData/Responses';

const test: Equal<UserPersonalDataWhiteList, PersonalDataBase> = true;

describe('Does UserPersonalDataWhiteList match PersonalDataBase', () => {
  it('should be true', () => {
    expect(test).toBe(true);
  });
});
