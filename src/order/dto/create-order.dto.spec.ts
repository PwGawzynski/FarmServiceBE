import { Equal } from '../../../TypeScriptHelpers/dtoToInterface';
import { CreateOrderDto } from './create-order.dto';
import { CreateOrderReqI } from '../../../FarmServiceTypes/Order/Requests';

const test: Equal<CreateOrderDto, CreateOrderReqI> = true;

describe('Does CreateOrderDto match CreateOrderReqI', () => {
  it('should be true', () => {
    expect(test).toBe(true);
  });
});
