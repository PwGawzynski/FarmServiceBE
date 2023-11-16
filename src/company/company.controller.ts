import { Body, Controller, Get, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Owner } from '../../decorators/auth.decorators';
import { CreateCompanyDto } from './dto/create-company.dto';
import { GetOwnedCompany, GetUser } from '../../decorators/user.decorators';
import { User } from '../user/entities/user.entity';
import { Company } from './entities/company.entity';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @Owner()
  async getCompanyInfo(@GetOwnedCompany() company: Company) {
    return this.companyService.getCompanyInfo(company);
  }

  @Post()
  @Owner()
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
    @GetUser() user: User,
  ) {
    return this.companyService.create(createCompanyDto, user);
  }
}
