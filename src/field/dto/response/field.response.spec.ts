import { Equal } from '../../../../TypeScriptHelpers/dtoToInterface';
import { FieldResponseWhiteList } from './field.response';
import { FieldResponseBase } from '../../../../FarmServiceTypes/Field/Ressponses';

const test: Equal<
  Omit<FieldResponseWhiteList, 'address'>,
  Omit<FieldResponseBase, 'address'>
> = true;

describe('Does FieldResponseWhiteList  match FiledResponseBase', () => {
  it('should be true', () => {
    expect(test).toBe(true);
  });
});
