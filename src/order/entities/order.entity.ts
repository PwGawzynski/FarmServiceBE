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
import { Field } from '../../field/entities/field.entity';
import OrderConstants from '../../../FarmServiceTypes/Order/Constants';
import { Company } from '../../company/entities/company.entity';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class Order extends BaseEntity {
  constructor(options?: {
    name: string;
    serviceType: ServiceType;
    performanceDate: Date;
    company: Promise<Company>;
    status?: OrderStatus;
    additionalInfo?: string;
    pricePerUnit?: number;
    openedAt?: Date;
    createdAt?: Date;
    fields?: Promise<Field[] | undefined>;
    id?: string;
  }) {
    super();
    if (options) {
      this.id = options.id;
      this.name = options.name;
      this.serviceType = options.serviceType;
      this.performanceDate = options.performanceDate;
      this.status = options.status;
      this.additionalInfo = options.additionalInfo;
      this.pricePerUnit = options.pricePerUnit;
      this.openedAt = options.openedAt;
      this.createdAt = options.createdAt;
      this.fields = options.fields;
      this.company = options.company;
    }
  }

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    type: 'varchar',
    length: OrderConstants.NAME_MAX_LEN,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Added,
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
      `SELECT SUM(area) FROM field WHERE field.orderId = ${alias}.id `,
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

  @ManyToOne(() => Company, (company) => company.orders, {
    nullable: false,
  })
  company: Promise<Company>;

  @OneToMany(() => Field, (field) => field.order, { nullable: true })
  fields?: Promise<Field[] | undefined>;

  @OneToMany(() => Task, (task) => task.order, { nullable: true })
  tasks?: Promise<Task[]>;
}
