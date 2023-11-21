import { Body, Controller, Post } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { ApiTags } from '@nestjs/swagger';
import { Owner } from '../../decorators/auth.decorators';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { GetOwnedCompany } from '../../decorators/user.decorators';
import { Company } from '../company/entities/company.entity';

@ApiTags('Worker')
@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post()
  @Owner()
  async create(
    @Body() createWorkerDto: CreateWorkerDto,
    @GetOwnedCompany() company: Company,
  ) {
    return this.workerService.create(createWorkerDto, company);
  }
}
