import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class CompanyAddress extends BaseEntity {
  constructor(options?: {
    city: string;
    county: string;
    postalCode: string;
    houseNumber: string;
    company: Promise<Company>;
    voivodeship?: string;
    street?: string;
    apartmentNumber?: string | undefined;
  }) {
    super();
    if (options) {
      this.city = options.city;
      this.county = options.county;
      this.voivodeship = options.voivodeship;
      this.postalCode = options.postalCode;
      this.houseNumber = options.houseNumber;
      this.company = options.company;
      this.street = options.street;
      this.apartmentNumber = options.apartmentNumber;
    }
  }
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
  street?: string | undefined;

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
