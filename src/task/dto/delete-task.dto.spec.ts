import { Equal } from '../../../TypeScriptHelpers/dtoToInterface';
import { DeleteTaskDto } from './delete-task.dto';
import { DeleteTaskReq } from '../../../FarmServiceTypes/Task/Requests';

const test: Equal<
  Omit<DeleteTaskDto, 'task'>,
  Omit<DeleteTaskReq, 'task'>
> = true;

describe('Does DeleteTaskDto match DeleteTaskReq', () => {
  it('should be true', () => {
    expect(test).toBe(true);
  });
});
