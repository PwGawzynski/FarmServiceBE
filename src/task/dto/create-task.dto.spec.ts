import { Equal } from '../../../TypeScriptHelpers/dtoToInterface';
import { CreateTaskDto } from './create-task.dto';
import { CreateTaskBase } from '../../../FarmServiceTypes/Task/Requests';

const test: Equal<
  Omit<
    CreateTaskDto,
    'worker' | 'field' | 'order' | keyof { [Symbol.iterator]: any }
  >,
  Omit<CreateTaskBase, 'worker' | 'field' | 'order'>
> = true;

describe('Does CreateTaskDto match CreateTaskBase', () => {
  it('should be true', () => {
    expect(test).toBe(true);
  });
});
