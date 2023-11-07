import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
