import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventType } from '../../../FarmServiceTypes/Notification/Enums';
import { User } from '../../user/entities/user.entity';
import NotificationConstants from '../../../FarmServiceTypes/Notification/Constants';

@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: NotificationConstants.SCHORT_INFO_MAX_LEN,
    nullable: false,
    name: 'schort_info',
  })
  schortInfo: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt?: Date;

  @Column({
    type: 'enum',
    enum: EventType,
    nullable: false,
    name: 'event_type',
  })
  eventType: EventType;

  @Column({
    type: 'varchar',
    length: NotificationConstants.DESCRIPTION_MAX_LEN,
    nullable: true,
  })
  description?: string;

  @ManyToOne(() => User, (user) => user.causedNotifications, {
    nullable: false,
  })
  @JoinColumn()
  causer: User;

  @ManyToMany(() => User, (recipient) => recipient.addressedNotifications, {
    nullable: false,
  })
  @JoinTable({
    name: 'notifications_recipients',
  })
  recipients: Promise<User[]>;
}
