import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailingModule } from '../mailing/mailing.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [MailingModule],
})
export class UserModule {}
