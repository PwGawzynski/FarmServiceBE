import { AddressWhiteList } from './address.response.dto';
import { Equal } from '../../../../TypeScriptHelpers/dtoToInterface';
import { AddressResponseBase } from '../../../../FarmServiceTypes/Address/Ressponses';

//TODO figure out chow to test types, because this approach is partially correct

const test: Equal<AddressWhiteList, AddressResponseBase> = true;

describe('Are AddressResponseBase match whitelist DTO', () => {
  it('should be true', () => {
    expect(test).toBe(true);
  });
});
