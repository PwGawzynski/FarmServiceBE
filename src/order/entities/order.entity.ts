import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  VirtualColumn,
} from 'typeorm';
import {
  OrderStatus,
  ServiceType,
} from '../../../FarmServiceTypes/Order/Enums';
import { User } from '../../user/entities/user.entity';
import { Field } from '../../field/entities/field.entity';
import { Task } from '../../task/entities/task.entity';
import OrderConstants from '../../../FarmServiceTypes/Order/Constants';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class Order extends BaseEntity {
  constructor(options?: {
    name: string;
    serviceType: ServiceType;
    performanceDate: Date;
    client: Promise<User>;
    company: Promise<Company>;
    status?: OrderStatus;
    additionalInfo?: string;
    pricePerUnit?: number;
    openedAt?: Date;
    createdAt?: Date;
    fields?: Promise<Field[] | undefined>;
  }) {
    super();
    if (options) {
      this.name = options.name;
      this.serviceType = options.serviceType;
      this.performanceDate = options.performanceDate;
      this.client = options.client;
      this.company = options.company;
      this.status = options.status;
      this.additionalInfo = options.additionalInfo;
      this.pricePerUnit = options.pricePerUnit;
      this.openedAt = options.openedAt;
      this.createdAt = options.createdAt;
      this.fields = options.fields;
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: OrderConstants.NAME_MAX_LEN,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Pending,
    nullable: false,
  })
  status?: OrderStatus;

  @Column({
    type: 'enum',
    enum: ServiceType,
    nullable: false,
    name: 'Service_Type',
  })
  serviceType: ServiceType;

  @Column({
    type: 'timestamp',
    nullable: false,
    name: 'performance_date',
  })
  performanceDate: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt?: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'opened_at',
    comment: 'date of start first task from order',
  })
  openedAt?: Date;

  @Column({
    type: 'varchar',
    length: OrderConstants.ADDITIONAL_INFO_MAX_LEN,
    nullable: true,
    name: 'additional_info',
  })
  additionalInfo?: string;

  // TODO virtual column for totalDoneArea based on isDone in connection table ManyToMany order-field(Task)
  @VirtualColumn({
    type: 'mediumint',
    query: (alias) =>
      `SELECT SUM("area") FROM "field" WHERE "field"."id" = ${alias}.id `,
  })
  totalArea?: string;

  @Column({
    type: 'numeric',
    precision: 9,
    scale: OrderConstants.MIN_PRICE_PER_UNIT_SCALE,
    name: 'price_per_unit',
    nullable: true,
  })
  pricePerUnit?: number;

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  client: Promise<User>;

  @ManyToOne(() => Company, (company) => company.orders, {
    nullable: false,
  })
  company: Promise<Company>;

  @OneToMany(() => Task, (task) => task.order, { nullable: true })
  fields?: Promise<Field[] | undefined>;
}
