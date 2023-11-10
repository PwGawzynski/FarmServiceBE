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
import FieldAddressConstants from '../../../FarmServiceTypes/FiledAddress/Constants';

@Entity()
export class FieldAddress extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: FieldAddressConstants.CITY_MAX_LEN,
    nullable: false,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: FieldAddressConstants.VOIVODESHIP_MAX_LEN,
    nullable: false,
  })
  voivodeship: string;

  @Column({
    type: 'varchar',
    length: FieldAddressConstants.COUNTY_MAX_LEN,
    nullable: false,
  })
  county: string;

  @Column({
    type: 'varchar',
    length: FieldAddressConstants.POSTAL_CODE_LEN,
    nullable: false,
  })
  postalCode: string;

  @Column({
    type: 'varchar',
    length: FieldAddressConstants.LATITUDE_MAX_LEN,
    nullable: false,
  })
  latitude: string;

  @Column({
    type: 'varchar',
    length: FieldAddressConstants.LONGITUDE_MAX_LEN,
    nullable: false,
  })
  longitude: string;

  @OneToOne(() => Field, (field) => field.address)
  @JoinColumn()
  @Index('UNIQ_FIELD', { unique: true })
  field: Promise<Field>;
}
