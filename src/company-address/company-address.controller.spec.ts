import { Test, TestingModule } from '@nestjs/testing';
import { CompanyAddressController } from './company-address.controller';
import { CompanyAddressService } from './company-address.service';

describe('CompanyAddressController', () => {
  let controller: CompanyAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyAddressController],
      providers: [CompanyAddressService],
    }).compile();

    controller = module.get<CompanyAddressController>(CompanyAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
