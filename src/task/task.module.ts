import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [NotificationsModule],
})
export class TaskModule {}
