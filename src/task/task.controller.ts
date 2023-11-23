import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiTags } from '@nestjs/swagger';
import { Owner } from '../../decorators/auth.decorators';
import { CrateTaskCollection } from './dto/create-task.dto';
import { GetOwnedCompany } from '../../decorators/user.decorators';
import { Company } from '../company/entities/company.entity';

@ApiTags('TaskController ')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Owner()
  async create(
    @Body() createTaskCollection: CrateTaskCollection,
    @GetOwnedCompany() company: Company,
  ) {
    return this.taskService.create(createTaskCollection, company);
  }

  @Get('all')
  @Owner()
  async all(@GetOwnedCompany() company: Company) {
    return this.taskService.all(company);
  }

  @Get('by-order/')
  @Owner()
  async allByOrder(
    @GetOwnedCompany() company: Company,
    @Param('id') id: string,
  ) {
    return this.taskService.allByOrder(company, id);
  }
}
