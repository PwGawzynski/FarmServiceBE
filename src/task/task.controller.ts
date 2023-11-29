import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiTags } from '@nestjs/swagger';
import { Owner, Worker } from '../../decorators/auth.decorators';
import { CrateTaskCollection } from './dto/create-task.dto';
import { GetOwnedCompany, GetUser } from '../../decorators/user.decorators';
import { Company } from '../company/entities/company.entity';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { User } from '../user/entities/user.entity';

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
    @Query('id') id: string,
  ) {
    return this.taskService.allByOrder(company, id);
  }

  @Get('worker')
  @Worker()
  async getAssignedTasks(@GetUser() user: User) {
    return this.taskService.getAssignedTasks(user);
  }

  @Post('open')
  @Worker()
  async open(@Query('id') id: string, @GetUser() user: User) {
    return this.taskService.open(id, user);
  }

  @Post('close')
  @Worker()
  async close(@Query('id') id: string, @GetUser() user: User) {
    return this.taskService.close(id, user);
  }

  @Delete()
  @Owner()
  async delete(
    @Body() deleteTaskDto: DeleteTaskDto,
    @GetOwnedCompany() company: Company,
  ) {
    return this.taskService.delete(deleteTaskDto, company);
  }
}
