import { Equal } from '../../../TypeScriptHelpers/dtoToInterface';
import { CreateFieldAddressDto } from './create-field-address.dto';
import { CreateFieldAddressReqI } from '../../../FarmServiceTypes/FiledAddress/Requests';

const test: Equal<
  Omit<CreateFieldAddressDto, 'field'>,
  Omit<CreateFieldAddressReqI, 'field'>
> = true;

describe('Does CreateFieldAddressDto match CreateFieldAddressReqI', () => {
  it('should be equal', () => {
    expect(test).toBe(true);
  });
});
