import { Injectable, NotFoundException } from '@nestjs/common';
import { Company } from '../company/entities/company.entity';
import { UpdateCompanyAddressDto } from './dto/update-company-address.dto';
import { CompanyAddress } from './entities/company-address.entity';
import {
  ResponseCode,
  ResponseObject,
} from '../../FarmServiceTypes/respnse/responseGeneric';
import { CompanyAddressResponseDto } from './dto/response/company-address.response';

@Injectable()
export class CompanyAddressService {
  async update(newAddressDto: UpdateCompanyAddressDto, company: Company) {
    company.address = Promise.resolve(
      new CompanyAddress({
        ...newAddressDto,
        company: Promise.resolve(company),
      }),
    );
    return {
      code: ResponseCode.ProcessedCorrect,
      payload: new CompanyAddressResponseDto({
        ...newAddressDto,
      }),
    } as ResponseObject<CompanyAddressResponseDto>;
  }

  async getAddress(id: string) {
    const companyAddress = await CompanyAddress.findOne({ where: { id } });
    if (!companyAddress)
      throw new NotFoundException(`Company-Address with given id don't exist`);
    return {
      code: ResponseCode.ProcessedCorrect,
      payload: new CompanyAddressResponseDto({ ...companyAddress }),
    } as ResponseObject<CompanyAddressResponseDto>;
  }
}
