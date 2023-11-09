import {
  Column,
  Entity,
  Index,
  JoinColumn,
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

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 40,
    nullable: false,
    name: 'polish_system_id',
  })
  @Index('UNIQ_POLISH_SYSTEM_ID', { unique: true })
  polishSystemId: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Pending,
    nullable: false,
  })
  status: OrderStatus;

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
    nullable: true,
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
    length: 10000,
    nullable: true,
    name: 'additional_info',
  })
  additional_info?: string;

  // TODO virtual column for totalDoneArea based on isDone in connection table ManyToMany order-field(Task)
  @VirtualColumn({
    type: 'mediumint',
    query: (alias) =>
      `SELECT SUM("area") FROM "field" WHERE "field"."id" = ${alias}.id `,
  })
  totalArea: string;

  @Column({
    type: 'numeric',
    precision: 9,
    scale: 2,
    name: 'price_per_unit',
    nullable: true,
  })
  pricePerUnit?: number;

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  client: Promise<User>;

  @OneToMany(() => Task, (task) => task.order, { nullable: true })
  @JoinColumn()
  fields?: Promise<Field[]>;
}
