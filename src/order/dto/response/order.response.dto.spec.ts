import { Equal } from '../../../../TypeScriptHelpers/dtoToInterface';
import { OrderResponseWhiteList } from './order.response.dto';
import { OrderResponseBase } from '../../../../FarmServiceTypes/Order/Ressponses';

const test: Equal<OrderResponseWhiteList, OrderResponseBase> = true;

describe('Does OrderResponseWhiteList match OrderResponseBase', () => {
  it('should be true', () => {
    expect(test).toBe(true);
  });
});
