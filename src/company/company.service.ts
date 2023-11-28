import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { User } from '../user/entities/user.entity';
import { Company } from './entities/company.entity';
import { CompanyAddress } from '../company-address/entities/company-address.entity';
import {
  ResponseCode,
  ResponseObject,
} from '../../FarmServiceTypes/respnse/responseGeneric';
import { CompanyResponseDto } from './dto/response/company.response.dto';
import { WorkerResponseDto } from '../worker/dto/response/worker-response.dto';
import { UserPersonalDataResponseDto } from '../user/dto/response/userPersonalData.response.dto';
import { AddressResponseDto } from '../commonEntities/dto/response/address.response.dto';

@Injectable()
export class CompanyService {
  async create(createCompanyDto: CreateCompanyDto, user: User) {
    const newCompany = new Company({
      ...createCompanyDto,
      address: undefined,
      workers: undefined,
      owner: Promise.resolve(user),
    });
    const newAddress = new CompanyAddress({
      ...createCompanyDto.address,
      company: Promise.resolve(newCompany),
    });

    await newCompany._shouldNotExist();
    await newCompany.save();
    await newAddress.save();
    /**
     * Company is updated with addressID due to OneToOne relation, we cannot save it in parallel
     */
    newCompany.address = Promise.resolve(newAddress);
    // await is not necessary here, because update is performed in db
    newCompany.save();

    user.company = Promise.resolve(newCompany);
    user.save();

    return {
      code: ResponseCode.ProcessedCorrect,
      payload: new CompanyResponseDto({
        name: newCompany.name,
        addressId: newAddress.id,
      }),
    } as ResponseObject<CompanyResponseDto>;
  }

  async getCompanyInfo(company: Company) {
    return {
      code: ResponseCode.ProcessedCorrect,
      payload: new CompanyResponseDto({
        name: company.name,
        addressId: (await company.address).id,
      }),
    } as ResponseObject<CompanyResponseDto>;
  }

  async delete(company: Company, user: User) {
    company.active = false;
    company.save();
    user.company = null;
    user.save();
    return {
      code: ResponseCode.ProcessedWithoutConfirmationWaiting,
    } as ResponseObject;
  }

  async getCompanyWorkers(company: Company) {
    return Promise.all(
      (await company.workers).map(
        async (worker) =>
          new WorkerResponseDto({
            ...worker,
            personalData: new UserPersonalDataResponseDto(
              await (
                await worker.user
              ).personalData,
            ),
            address: new AddressResponseDto(await (await worker.user).address),
            email: (await worker.user).email,
          }),
      ),
    );
  }
}
