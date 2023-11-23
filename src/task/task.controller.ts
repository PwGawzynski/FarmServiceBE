import { Body, Controller, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiTags } from '@nestjs/swagger';
import { Owner } from '../../decorators/auth.decorators';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetOwnedCompany } from '../../decorators/user.decorators';
import { Company } from '../company/entities/company.entity';

@ApiTags('Taskcontroller ')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Owner()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @GetOwnedCompany() company: Company,
  ) {
    return this.taskService.create(createTaskDto, company);
  }
}
