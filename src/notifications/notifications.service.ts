import { Injectable } from '@nestjs/common';
import { Notification } from './entities/notification.entity';
import { User } from '../user/entities/user.entity';
import { EventType } from '../../FarmServiceTypes/Notification/Enums';
import { Company } from '../company/entities/company.entity';
import { concatMap, interval } from 'rxjs';
import { In } from 'typeorm';
import { NotificationResponseDto } from './dto/response/notification-response.dto';
import { UserPersonalDataResponseDto } from '../user/dto/response/userPersonalData.response.dto';

@Injectable()
export class NotificationsService {
  async create(
    causer: User,
    description: string,
    shortInfo: string,
    eventType: EventType,
  ) {
    const newNotification = new Notification();
    newNotification.causer = Promise.resolve(causer);
    newNotification.description = description;
    newNotification.schortInfo = shortInfo;
    newNotification.eventType = eventType;
    newNotification.save();
    return true;
  }

  getTasksSse(company: Company) {
    console.log('openedSeee');
    return interval(2000).pipe(
      concatMap(async () => {
        console.log(In((await company.workers).map((u) => u.id)));
        const notifications = await Notification.find({
          where: {
            causer: {
              id: In(
                await Promise.all(
                  (await company.workers).map(async (u) => (await u.user).id),
                ),
              ),
            },
          },
        });
        const res = await Promise.all(
          notifications.map(
            async (n) =>
              new NotificationResponseDto({
                createdAt: n.createdAt,
                causer: new UserPersonalDataResponseDto(
                  await (
                    await n.causer
                  ).personalData,
                ),
                id: n.id,
                description: n.description,
                eventType: n.eventType,
                shortInfo: n.schortInfo,
              }),
          ),
        );
        return {
          data: JSON.stringify(res),
        };
      }),
    );
  }
}
