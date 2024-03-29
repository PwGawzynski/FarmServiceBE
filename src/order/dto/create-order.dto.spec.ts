import { Equal } from '../../../TypeScriptHelpers/dtoToInterface';
import { CreateOrderDto } from './create-order.dto';
import { CreateOrderReqI } from '../../../FarmServiceTypes/Order/Requests';

const test: Equal<
  Omit<CreateOrderDto, keyof { [Symbol.iterator]: any }>,
  CreateOrderReqI
> = true;

describe('Does CreateOrderDto match CreateOrderReqI', () => {
  it('should be true', () => {
    expect(test).toBe(true);
  });
});
