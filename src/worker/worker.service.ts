import { Injectable } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { Company } from '../company/entities/company.entity';
import { Worker } from './entities/worker.entity';
import {
  ResponseCode,
  ResponseObject,
} from '../../FarmServiceTypes/respnse/responseGeneric';

@Injectable()
export class WorkerService {
  async create(createWorkerDto: CreateWorkerDto, company: Company) {
    const newWorker = new Worker({
      company: Promise.resolve(company),
      user: Promise.resolve(createWorkerDto.user),
    });
    await newWorker._shouldNotExist();
    newWorker.save();
    return { code: ResponseCode.ProcessedCorrect } as ResponseObject;
  }
}
