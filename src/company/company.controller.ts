import { Controller, Get, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';
import { Owner } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../Guards/RoleGuard';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Owner()
  async isOwner() {
    console.log('dziala');
  }
}
