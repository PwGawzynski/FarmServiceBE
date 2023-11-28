import { Equal } from '../../../../TypeScriptHelpers/dtoToInterface';
import { WorkerResponseDto } from './worker-response.dto';
import { WorkerResponseBase } from '../../../../FarmServiceTypes/Worker/Responses';

const test: Equal<
  Omit<WorkerResponseDto, 'personalData' | 'address'>,
  Omit<WorkerResponseBase, 'personalData' | 'address'>
> = true;

describe('Does WorkerResponseDto match WorkerResponseBase', () => {
  it('should be true ', () => {
    expect(test).toBe(true);
  });
});
