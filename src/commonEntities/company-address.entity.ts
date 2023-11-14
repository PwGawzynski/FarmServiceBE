import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../company/entities/company.entity';

@Entity()
export class CompanyAddress extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    length: 70,
  })
  city: string;

  @Column({
    length: 50,
    nullable: false,
  })
  county: string;

  @Column({
    length: 50,
    nullable: true,
  })
  voivodeship?: string;

  @Column({
    length: 6,
    nullable: false,
  })
  postalCode: string;

  @Column({
    length: 100,
    nullable: true,
  })
  street?: string;

  @Column({
    length: 20,
    nullable: false,
  })
  houseNumber: string;

  @Column({
    length: 20,
    nullable: true,
  })
  apartmentNumber?: string | undefined;

  @OneToOne(() => Company, (company) => company.address, { nullable: true })
  @JoinColumn()
  @Index('UNIQ_COMPANY', { unique: true })
  company: Promise<Company>;
}
