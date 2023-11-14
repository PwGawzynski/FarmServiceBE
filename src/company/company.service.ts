import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { User } from '../user/entities/user.entity';
import { Company } from './entities/company.entity';
import * as console from 'console';
import { CompanyAddress } from '../commonEntities/company-address.entity';

@Injectable()
export class CompanyService {
  async create(createCompanyDto: CreateCompanyDto, user: User) {
    const newCompany = new Company();
    const newAddress = new CompanyAddress();

    newCompany.name = createCompanyDto.name;
    newCompany.owner = Promise.resolve(user);
    await newCompany.save();

    newAddress.city = createCompanyDto.address.city;
    newAddress.county = createCompanyDto.address.county;
    newAddress.street = createCompanyDto.address.street;
    newAddress.voivodeship = createCompanyDto.address.voivodeship;
    newAddress.houseNumber = createCompanyDto.address.houseNumber;
    newAddress.apartmentNumber = createCompanyDto.address.apartmentNumber;
    newAddress.postalCode = createCompanyDto.address.postalCode;
    newAddress.company = Promise.resolve(newCompany);

    await newAddress.save();

    newCompany.address = Promise.resolve(newAddress);
    newCompany.save();

    console.log(newCompany);
    // TODO return DTO
    return 'okks';
  }
}
