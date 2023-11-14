import { Body, Controller, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Owner } from '../../decorators/auth.decorators';
import { CreateCompanyDto } from './dto/create-company.dto';
import { GetOwnedCompany, GetUser } from '../../decorators/user.decorators';
import { Company } from './entities/company.entity';
import { User } from '../user/entities/user.entity';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @Owner()
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
    @GetUser() user: User,
  ) {
    return this.companyService.create(createCompanyDto, user);
  }
}
