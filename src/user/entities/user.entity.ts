import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { UserPersonalData } from './userPersonalData.entity';
import { Address } from '../../commonEntities/address.entity';
import { UserRole } from '../../../FarmServiceTypes/User/RegisterNewUserDataDtoInterfaceMobi';
import { Field } from '../../field/entities/field.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { Company } from '../../company/entities/company.entity';

/**
 * Main user entity, this table is in charge of connect with rest of user tables
 * like account and user personal data, here should be stored any indexes columns for performance reason
 */
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 40,
    nullable: false,
    unique: true,
  })
  userLoginIdentificator: string;

  @Column({
    length: 350,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.worker,
  })
  role: UserRole;

  @OneToOne(() => Account, (account) => account.user, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'account_id',
  })
  @Index({ unique: true })
  account: Promise<Account>;

  @OneToOne(() => UserPersonalData, (personalData) => personalData.user, {
    onDelete: 'CASCADE',
  })
  @Index({ unique: true })
  @JoinColumn({
    name: 'user_personal_data_id',
  })
  personalData: Promise<UserPersonalData>;

  @OneToOne(() => Address, (address) => address.user, {
    onDelete: 'CASCADE',
  })
  @Index({ unique: true })
  @JoinColumn({
    name: 'user_address_id',
  })
  address: Promise<Address>;

  @OneToMany(() => Field, (field) => field.owner)
  @JoinColumn({ name: 'owned_fields' })
  fields: Promise<Field[]>;

  @OneToMany(() => Notification, (notification) => notification.causer)
  @JoinColumn({ name: 'caused_notifications' })
  causedNotifications: Promise<Notification[]>;

  @ManyToMany(() => Notification, (notification) => notification.recipients)
  addressedNotifications: Promise<Notification[]>;

  @OneToOne(() => Company, (company) => company.owner, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @Index({ unique: true })
  @JoinColumn()
  company: Promise<Company>;
}
