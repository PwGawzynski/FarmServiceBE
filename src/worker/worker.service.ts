import { Injectable } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { Company } from '../company/entities/company.entity';
import { Worker } from './entities/worker.entity';
import {
  ResponseCode,
  ResponseObject,
} from '../../FarmServiceTypes/respnse/responseGeneric';
import { WorkerResponseDto } from './dto/response/worker-response.dto';

@Injectable()
export class WorkerService {
  async create(createWorkerDto: CreateWorkerDto, company: Company) {
    const newWorker = new Worker({
      company: Promise.resolve(company),
      user: Promise.resolve(createWorkerDto.user),
    });
    await newWorker._shouldNotExist();
    console.log('WORKER_ID_ASK');
    newWorker.save();
    return {
      code: ResponseCode.ProcessedCorrect,
      payload: new WorkerResponseDto({
        personalData: await (await newWorker.user).personalData,
      }),
    } as ResponseObject<WorkerResponseDto>;
  }
}
