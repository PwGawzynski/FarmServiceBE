import { Body, Controller, Get, Param, Post, Sse } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { ApiTags } from '@nestjs/swagger';
import { Owner, Worker } from '../../decorators/auth.decorators';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { GetOwnedCompany, GetUser } from '../../decorators/user.decorators';
import { Company } from '../company/entities/company.entity';
import { User } from '../user/entities/user.entity';

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

  @Sse('sse/:id')
  isAssigned(@Param('id') id: string) {
    return this.workerService.isAssigned(id);
  }

  @Get('id')
  @Worker()
  async getId(@GetUser() user: User) {
    return this.workerService.getId(user);
  }
}
