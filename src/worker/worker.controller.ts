import { Controller } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Worker')
@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}
}
