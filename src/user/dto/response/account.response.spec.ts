import { Equal } from '../../../../TypeScriptHelpers/dtoToInterface';
import { AccountWhiteList } from './account.response';
import { AccountResponseBase } from '../../../../FarmServiceTypes/Account/Ressponses';

/**
 * This test make sens because type which can be assigned to test var,
 * depends on Equal operator which checks if interfaces are equal
 */
const test: Equal<AccountWhiteList, AccountResponseBase> = true;

describe('Does AccountResponseBase whitelist match DTO', () => {
  it('should be true', () => expect(test).toBe(true));
});
