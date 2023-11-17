import {
  DtoToInterface,
  Equal,
} from '../../../TypeScriptHelpers/dtoToInterface';
import { CreateCompanyReqI } from '../../../FarmServiceTypes/Common/Requests';
import { CreateCompanyDto } from './create-company.dto';

/**
 * Here we omit nested interface, nested type check in research
 */
const test: Equal<
  Omit<
    DtoToInterface<CreateCompanyDto>,
    'address' | keyof { [Symbol.iterator]: any }
  >,
  Omit<CreateCompanyReqI, 'address'>
> = true;

describe('Does CreateCompanyReqI match CreateCompanyDto', () => {
  it('should be true', () => {
    expect(test).toBe(true);
  });
});
