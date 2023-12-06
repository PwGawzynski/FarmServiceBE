import { Controller, Get, Sse } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiTags } from '@nestjs/swagger';
import { Owner } from '../../decorators/auth.decorators';
import { GetOwnedCompany } from '../../decorators/user.decorators';
import { Company } from '../company/entities/company.entity';
@ApiTags('Notification')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('sse')
  @Sse()
  @Owner()
  async getTasksSse(@GetOwnedCompany() company: Company) {
    return this.notificationsService.getTasksSse(company);
  }
}
