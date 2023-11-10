import { Equal } from '../../../../TypeScriptHelpers/dtoToInterface';
import { AccountResponseWhiteList } from './account.response';
import { AccountResponseBase } from '../../../../FarmServiceTypes/Account/Ressponses';

/**
 * This test make sens because type which can be assigned to test var,
 * depends on Equal operator which checks if interfaces are equal
 */
const test: Equal<AccountResponseWhiteList, AccountResponseBase> = true;

describe('IsAccountAndDtoEqual', () => {
  it('should be true', () => expect(test).toBe(true));
});
