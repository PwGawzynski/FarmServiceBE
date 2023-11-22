import { Injectable } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { Company } from '../company/entities/company.entity';
import { Worker } from './entities/worker.entity';
import {
  ResponseCode,
  ResponseObject,
} from '../../FarmServiceTypes/respnse/responseGeneric';
import { WorkerResponseDto } from './dto/response/worker-response.dto';
import { concatMap, filter, interval, take } from 'rxjs';

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

  isAssigned(id: string) {
    return interval(2000).pipe(
      concatMap(async () => {
        const worker = await Worker.findOne({ where: { user: { id } } });
        if (worker) {
          await worker.user;
          console.log(worker, 'RES');
          return {
            data: JSON.stringify(await (await worker.user).personalData),
          };
        }
        return {
          data: undefined,
        };
      }),
      filter((result) => result.data !== undefined),
      take(1),
    );
  }
}
