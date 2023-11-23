import { Equal } from '../../../../TypeScriptHelpers/dtoToInterface';
import { CreateTaskResponseDto } from './create-task.response.dto';
import { TaskResponseBase } from '../../../../FarmServiceTypes/Task/Restonses';

const test: Equal<
  Omit<CreateTaskResponseDto, 'field'>,
  Omit<TaskResponseBase, 'field'>
> = true;

describe('Does CreateTaskResponseDto match TaskResponseBase', () => {
  it('should be true', () => {
    expect(test).toBe(true);
  });
});
