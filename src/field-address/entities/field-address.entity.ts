import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field } from '../../field/entities/field.entity';

@Entity()
export class FieldAddress extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 70,
    nullable: false,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  voivodeship: string;

  @Column({
    type: 'varchar',
    length: 70,
    nullable: false,
  })
  county: string;

  @Column({
    type: 'varchar',
    length: 6,
    nullable: false,
  })
  postalCode: string;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: false,
  })
  latitude: string;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: false,
  })
  longitude: string;

  @OneToOne(() => Field, (field) => field.address)
  @JoinColumn()
  @Index('UNIQ_FIELD', { unique: true })
  field: Promise<Field>;
}
