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
import { Order } from '../../order/entities/order.entity';
import FieldConstants from '../../../FarmServiceTypes/Field/Constants';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class Field extends BaseEntity {
  constructor(options?: {
    polishSystemId: string;
    order: Promise<Order>;
    area: number;
    dateOfCollectionData: Date;
    address: Promise<FieldAddress>;
  }) {
    super();
    if (options) {
      this.order = options.order;
      this.polishSystemId = options.polishSystemId;
      this.area = options.area;
      this.dateOfCollectionData = options.dateOfCollectionData;
      this.address = options.address;
    }
  }
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

  @ManyToOne(() => Order, (order) => order.fields, { nullable: false })
  order: Promise<Order | undefined>;

  @OneToMany(() => Task, (tasks) => tasks.field, { nullable: true })
  tasks?: Promise<Task[]>;
}
