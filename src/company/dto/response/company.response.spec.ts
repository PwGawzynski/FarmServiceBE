import { CompanyResponseWhiteList } from './company.response.dto';
import { CompanyResponseBase } from '../../../../FarmServiceTypes/Company/Ressponses';
import { Equal } from '../../../../TypeScriptHelpers/dtoToInterface';

const test: Equal<CompanyResponseWhiteList, CompanyResponseBase> = true;

describe('Does CompanyResponseWhiteList matches CompanyResponseBase', () => {
  it('should be true', () => {
    expect(test).toBe(true);
  });
});
