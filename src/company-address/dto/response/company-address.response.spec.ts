import { CompanyAddressResponseWhiteList } from './company-address.response';
import { CompanyAddressResponseBase } from '../../../../FarmServiceTypes/CompanyAddress/Responses';
import { Equal } from '../../../../TypeScriptHelpers/dtoToInterface';

const test: Equal<CompanyAddressResponseWhiteList, CompanyAddressResponseBase> =
  true;

describe('Are CompanyAddressResponseWhiteList match CompanyAddressResponseBase', () => {
  it('should be true', () => {
    expect(test).toBe(true);
  });
});
