import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
  async create(createCompanyDto: CreateCompanyDto) {
    console.log(createCompanyDto);
    return 'oks';
  }
}
