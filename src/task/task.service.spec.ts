import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { NotificationsModule } from '../notifications/notifications.module';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
      imports: [NotificationsModule],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
