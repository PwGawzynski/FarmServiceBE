import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FieldAddress } from '../../field-address/entities/field-address.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Field extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 40,
    nullable: false,
    name: 'polish_system_id',
  })
  polishSystemId: string;

  @Column({
    type: 'smallint',
    nullable: false,
    unsigned: true,
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
  })
  @JoinColumn({ name: 'address_id' })
  address: Promise<FieldAddress>;

  @ManyToOne(() => User, (user) => user.fields)
  @JoinColumn({ name: 'owner_id' })
  owner: Promise<User>;
}
