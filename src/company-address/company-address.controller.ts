import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { CompanyAddressService } from './company-address.service';
import { Owner } from '../../decorators/auth.decorators';
import { UpdateCompanyAddressDto } from './dto/update-company-address.dto';
import { GetOwnedCompany } from '../../decorators/user.decorators';
import { Company } from '../company/entities/company.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Company-Address')
@Controller('company-address')
export class CompanyAddressController {
  constructor(private readonly companyAddressService: CompanyAddressService) {}

  @Get()
  async getAddress(@Param('id') id: string) {
    return this.companyAddressService.getAddress(id);
  }

  @Put()
  @Owner()
  async update(
    @Body() newAddressDto: UpdateCompanyAddressDto,
    @GetOwnedCompany() company: Company,
  ) {
    return this.companyAddressService.update(newAddressDto, company);
  }
}
