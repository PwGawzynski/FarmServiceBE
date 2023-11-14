import { Body, Controller, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Owner } from '../../decorators/auth.decorators';
import { CreateCompanyDto } from './dto/create-company.dto';
import { GetOwnedCompany } from '../../decorators/user.decorators';
import { Company } from './entities/company.entity';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @Owner()
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
    @GetOwnedCompany() company: Company,
  ) {
    return this.companyService.create(createCompanyDto);
  }
}
