import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FieldAddress } from '../../field-address/entities/field-address.entity';
import { User } from '../../user/entities/user.entity';
import { Order } from '../../order/entities/order.entity';
import { Task } from '../../task/entities/task.entity';
import FieldConstants from '../../../FarmServiceTypes/Field/Constants';

@Entity()
export class Field extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: FieldConstants.POLISH_ID_MAX_LEN,
    nullable: false,
    name: 'polish_system_id',
  })
  @Index('UNIQ_POLISH_SYSTEM_ID', { unique: true })
  polishSystemId: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: FieldConstants.AREA_MAX_DECIMAL_PLACES,
    unsigned: true,
    nullable: false,
  })
  area: number;

  @Column({
    type: 'timestamp',
    nullable: false,
    name: 'date_of_collection_data',
  })
  dateOfCollectionData: Date;

  @OneToOne(() => FieldAddress, (fieldAddress) => fieldAddress.field, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'address_id' })
  @Index('UNIQ_ADDRESS', { unique: true })
  address: Promise<FieldAddress>;

  @ManyToOne(() => User, (user) => user.fields)
  @JoinColumn({ name: 'owner_id' })
  owner: Promise<User>;

  @OneToMany(() => Task, (task) => task.field, { nullable: true })
  @JoinColumn({ name: 'appears_in_orders' })
  appearsInOrders?: Promise<Order[]>;
}
