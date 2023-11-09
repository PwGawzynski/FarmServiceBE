import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Field } from '../../field/entities/field.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'bool',
    default: false,
    name: 'is_done',
    nullable: false,
  })
  isDone: boolean;

  // TODO add connection table task-[start-pause-logs] to store logs when task is opened passed opened and closed

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
    name: 'opened_at',
  })
  openedAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'closed_at',
  })
  closedAt: Date;

  @ManyToOne(() => Order, (order) => order.fields)
  @JoinColumn({ name: 'order_id' })
  order: Promise<Order>;

  @ManyToOne(() => Field, (field) => field.appearsInOrders)
  @JoinColumn({ name: 'Field_id' })
  field: Promise<Field>;
}
