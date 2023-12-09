import { Equal } from '../../../../TypeScriptHelpers/dtoToInterface';
import { MachineResponseDto } from './machine.response.dto';
import { MachineResponseBase } from '../../../../FarmServiceTypes/Machine/Responses';

const test: Equal<MachineResponseDto, MachineResponseBase> = true;

describe("Doe's MachineResponseDto match MachineResponseBase", () => {
  it('should be true', () => {
    expect(test).toBe(true);
  });
});
