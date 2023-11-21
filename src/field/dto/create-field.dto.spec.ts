import { Equal } from '../../../TypeScriptHelpers/dtoToInterface';
import { CreateFieldDto } from './create-field.dto';
import { CreateFieldReqI } from '../../../FarmServiceTypes/Field/Requests';

const test: Equal<
  Omit<CreateFieldDto, 'address' | 'order' | keyof { [Symbol.iterator]: any }>,
  Omit<CreateFieldReqI, 'address' | 'order'>
> = true;

describe('Does CreateFieldDto match CreateFieldReqI', () => {
  it('should be equal', () => {
    expect(test).toBe(true);
  });
});
