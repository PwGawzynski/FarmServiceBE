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
import { Order } from '../../order/entities/order.entity';
import { Field } from '../../field/entities/field.entity';
import { Worker } from '../../worker/entities/worker.entity';
import { TaskType } from '../../../FarmServiceTypes/Task/Enums';
import { ConflictException } from '@nestjs/common';
import { Company } from '../../company/entities/company.entity';
import { Machine } from '../../machine/entities/machine.entity';

@Entity()
export class Task extends BaseEntity {
  constructor(partial?: Partial<Task>) {
    super();
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'bool',
    default: false,
    name: 'is_done',
  })
  isDone?: boolean;

  @Column({
    type: 'enum',
    enum: TaskType,
    nullable: false,
  })
  type: TaskType;

  // TODO add connection table task-[start-pause-logs] to store logs when task is opened passed opened and closed

  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'opened_at',
  })
  openedAt?: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt?: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'closed_at',
  })
  closedAt?: Date;

  @ManyToOne(() => Order, (order) => order.tasks)
  @JoinColumn({ name: 'order_id' })
  order: Promise<Order>;

  @ManyToOne(() => Worker, (worker) => worker.tasks)
  @JoinColumn({ name: 'worker_id' })
  worker: Promise<Worker>;

  @ManyToOne(() => Field, (field) => field.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'field_id' })
  field: Promise<Field>;

  @ManyToMany(() => Machine, (machine) => machine.tasks, { cascade: true })
  @JoinTable({ name: 'tasks_machines' })
  machines: Promise<Machine[] | null>;

  @ManyToOne(() => Company, (company) => company.tasks)
  @JoinColumn({ name: 'company_id' })
  company: Promise<Company>;

  async _shouldBeValidWhenCreate(company: Company) {
    const order = await this.order;
    const field = await this.field;
    const idsMatches = order.id === (await field.order).id;
    const isCompanyWorker =
      (await (await this.worker).company).id === company.id;
    const isCompanyOrder = (await (await this.order).company).id === company.id;
    if (!idsMatches && isCompanyWorker && isCompanyOrder)
      throw new ConflictException(
        `Given field ${field.id} is not assigned to order`,
      );
    return true;
  }
}
