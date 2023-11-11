import { Equal } from '../../../TypeScriptHelpers/dtoToInterface';
import { CreateWorkerDto } from './create-worker.dto';
import { CreateWorkerReqI } from '../../../FarmServiceTypes/Worker/Requests';

const test: Equal<CreateWorkerDto, CreateWorkerReqI> = true;

describe('Does CreateWorkerDto match CreateWorkerReqI', () => {
  it('should be true', () => {
    expect(test).toBe(true);
  });
});
