import { Equal } from '../../../../TypeScriptHelpers/dtoToInterface';
import { DataFromXLMResponseDto } from './dataFromXLM.dto';
import { DataFromXMLRes } from '../../../../FarmServiceTypes/Field/Ressponses';

const test: Equal<DataFromXLMResponseDto, DataFromXMLRes> = true;

describe('Does DataFromXLMResponseDto match DataFromXMLRes', () => {
  it('should be true', () => {
    expect(test).toBe(true);
  });
});
