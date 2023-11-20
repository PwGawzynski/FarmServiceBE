import { Equal } from '../../../TypeScriptHelpers/dtoToInterface';
import { CreateFieldDto } from './create-field.dto';
import { CreateFieldReqI } from '../../../FarmServiceTypes/Field/Requests';

const test: Equal<
  Omit<CreateFieldDto, 'address' | keyof { [Symbol.iterator]: any }>,
  Omit<CreateFieldReqI, 'address' | 'owner_id'>
> = true;

describe('Does CreateFieldDto match CreateFieldReqI', () => {
  it('should be equal', () => {
    expect(test).toBe(true);
  });
});
