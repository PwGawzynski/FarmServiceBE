import { Equal } from '../../../../TypeScriptHelpers/dtoToInterface';
import { UserResponseDto } from './user.response.dto';
import {
  UserResponseBase,
  WorkerIdResponseI,
} from '../../../../FarmServiceTypes/User/Responses';
import { WorkerIdResponseDto } from '../../../worker/dto/response/worker-response.dto';

const test: Equal<
  Omit<UserResponseDto, 'personalData' | 'address' | 'account'>,
  Omit<UserResponseBase, 'personalData' | 'address' | 'account'>
> = true;

describe('Dose UserResponseDto match UserResponseBase', () => {
  it('should be tru', () => {
    expect(test).toBe(true);
  });
});

const testWorkerIdResponse: Equal<WorkerIdResponseDto, WorkerIdResponseI> =
  true;
describe('Does WorkerIdResponseDto match WorkerIdResponseI', () => {
  it('should be true', () => {
    expect(testWorkerIdResponse).toBe(true);
  });
});
