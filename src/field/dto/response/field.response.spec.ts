import { Equal } from '../../../../TypeScriptHelpers/dtoToInterface';
import { FieldResponseWhiteList } from './field.response';
import { FiledResponseBase } from '../../../../FarmServiceTypes/Field/Ressponses';

const test: Equal<
  Omit<FieldResponseWhiteList, 'addressId'>,
  Omit<FiledResponseBase, 'address'>
> = true;

describe('Are FieldResponseWhiteList  match FiledResponseBase', () => {
  it('should be true', () => {
    expect(test).toBe(true);
  });
});
