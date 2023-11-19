import { Equal } from '../../../../TypeScriptHelpers/dtoToInterface';
import { FieldAddressResponseWhiteList } from './field-address.response.dto';
import { FieldAddressResponseBase } from '../../../../FarmServiceTypes/FiledAddress/Ressponses';

const test: Equal<FieldAddressResponseWhiteList, FieldAddressResponseBase> =
  true;

describe('Are FieldAddressResponseWhiteList math FieldAddressResponseBase', () => {
  it('should be true', () => {
    expect(test).toBe(true);
  });
});
