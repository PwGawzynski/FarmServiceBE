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
import { User } from '../../user/entities/user.entity';
import { Worker } from '../../worker/entities/worker.entity';
import CompanyConstants from '../../../FarmServiceTypes/Company/Constants';
import { CompanyAddress } from '../../commonEntities/company-address.entity';

@Entity()
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: CompanyConstants.NAME_MAX_LEN,
    nullable: false,
  })
  name: string;

  @ManyToOne(() => CompanyAddress)
  @Index('UNIQ_COMPANY_ADDRESS', { unique: true })
  @JoinColumn()
  address: Promise<CompanyAddress>;

  @OneToOne(() => User, (user) => user.company, { nullable: false })
  @Index('UNIQ_USER', { unique: true })
  @JoinColumn()
  owner: Promise<User>;

  @OneToMany(() => Worker, (worker) => worker.company, { nullable: true })
  workers?: Promise<Worker | undefined>;
}
