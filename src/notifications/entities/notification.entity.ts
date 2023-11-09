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
import { EventType } from '../../../FarmServiceTypes/notification/notification';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    name: 'schort_info',
  })
  schortInfo: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
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
    length: 10000,
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
