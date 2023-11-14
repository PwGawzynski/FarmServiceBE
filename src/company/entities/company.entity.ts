import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from '../../commonEntities/address.entity';
import { User } from '../../user/entities/user.entity';
import { Worker } from '../../worker/entities/worker.entity';
import CompanyConstants from '../../../FarmServiceTypes/Company/Constants';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: CompanyConstants.NAME_MAX_LEN,
    nullable: false,
  })
  name: string;

  @ManyToOne(() => Address)
  @JoinColumn()
  address: Promise<Address>;

  @OneToOne(() => User, (user) => user.company, { nullable: false })
  @Index('UNIQ_USER', { unique: true })
  @JoinColumn()
  owner: Promise<User>;

  @OneToMany(() => Worker, (worker) => worker.company, { nullable: true })
  workers?: Promise<Worker | undefined>;
}
