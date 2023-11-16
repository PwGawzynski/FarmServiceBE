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
import { ConflictException } from '@nestjs/common';

@Entity()
export class Company extends BaseEntity {
  constructor(options?: {
    name: string;
    address: Promise<CompanyAddress>;
    owner: Promise<User | undefined>;
    workers: Promise<Array<Worker> | undefined>;
  }) {
    super();
    if (options) {
      this.name = options.name;
      this.address = options.address;
      this.owner = options.owner;
      this.workers = options.workers;
    }
  }

  private readonly CAUSER_HAS_COMPANY =
    'Causer Already has Company assigned to Account';

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
  workers?: Promise<Array<Worker> | undefined>;

  async _shouldNotExist() {
    const exist = await Company.findOne({
      where: {
        owner: {
          id: (await this.owner).id,
        },
      },
    });
    if (exist) throw new ConflictException(this.CAUSER_HAS_COMPANY);
  }
}
