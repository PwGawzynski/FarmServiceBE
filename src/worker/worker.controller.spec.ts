import { Test, TestingModule } from '@nestjs/testing';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { MailingModule } from '../mailing/mailing.module';
import { MailingService } from '../mailing/mailing.service';
import { ConfigService } from '@nestjs/config';
import { createMock } from '@golevelup/ts-jest';

describe('WorkerController', () => {
  let controller: WorkerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkerController],
      providers: [
        WorkerService,
        /**
         * To fix cannot resolve dependency of
         */
        { provide: MailingService, useValue: createMock<MailingService>() },
      ],
    }).compile();

    controller = module.get<WorkerController>(WorkerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
