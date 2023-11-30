import { Injectable } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { Company } from '../company/entities/company.entity';
import { Worker } from './entities/worker.entity';
import {
  ResponseCode,
  ResponseObject,
} from '../../FarmServiceTypes/respnse/responseGeneric';
import {
  WorkerIdResponseDto,
  WorkerResponseDto,
} from './dto/response/worker-response.dto';
import { concatMap, filter, interval, take } from 'rxjs';
import { User } from '../user/entities/user.entity';

@Injectable()
export class WorkerService {
  async create(createWorkerDto: CreateWorkerDto, company: Company) {
    const newWorker = new Worker({
      company: Promise.resolve(company),
      user: Promise.resolve(createWorkerDto.user),
    });
    await newWorker._shouldNotExist();
    console.log('WORKER_ID_ASK');
    await newWorker.save();
    (await newWorker.user).worker = Promise.resolve(newWorker);
    (await newWorker.user).save();
    return {
      code: ResponseCode.ProcessedCorrect,
      payload: new WorkerResponseDto({
        personalData: await (await newWorker.user).personalData,
      }),
    } as ResponseObject<WorkerResponseDto>;
  }

  async getId(user: User) {
    return {
      code: ResponseCode.ProcessedCorrect,
      payload: new WorkerIdResponseDto({
        id: user.id,
        companyId: (await (await user.worker)?.company)?.id,
      }),
    } as ResponseObject<WorkerIdResponseDto>;
  }

  isAssigned(id: string) {
    console.log('KURWAAATEST');
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
