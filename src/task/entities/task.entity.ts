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

  @ManyToOne(() => Order, (order) => order.fields)
  @JoinColumn({ name: 'order_id' })
  order: Promise<Order>;

  @ManyToOne(() => Field, (field) => field.appearsInOrders)
  @JoinColumn({ name: 'Field_id' })
  field: Promise<Field>;

  @Column({
    type: 'bool',
    default: false,
    name: 'is_done',
  })
  isDone: boolean;
}
