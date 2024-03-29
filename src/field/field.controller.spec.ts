import { Test, TestingModule } from '@nestjs/testing';
import { FieldController } from './field.controller';
import { FieldService } from './field.service';
import { HttpModule } from '@nestjs/axios';

describe('FieldController', () => {
  let controller: FieldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.registerAsync({
          useFactory: () => ({
            timeout: 5000,
            maxRedirects: 5,
          }),
        }),
      ],
      controllers: [FieldController],
      providers: [FieldService],
    }).compile();

    controller = module.get<FieldController>(FieldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
