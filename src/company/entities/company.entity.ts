import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Worker } from '../../worker/entities/worker.entity';
import CompanyConstants from '../../../FarmServiceTypes/Company/Constants';
import { CompanyAddress } from '../../company-address/entities/company-address.entity';
import { ConflictException } from '@nestjs/common';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class Company extends BaseEntity {
  constructor(options?: {
    name: string;
    address: Promise<CompanyAddress>;
    owner: Promise<User | undefined>;
    workers?: Promise<Array<Worker> | undefined>;
  }) {
    super();
    if (options) {
      this.name = options.name;
      this.address = options.address;
      this.owner = options.owner;
      this.workers = options.workers;
    }
  }

  private static readonly CAUSER_HAS_COMPANY =
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

  @ManyToOne(() => User, (user) => user.company, { nullable: false })
  @JoinColumn()
  owner: Promise<User>;

  @OneToMany(() => Worker, (worker) => worker.company, { nullable: true })
  workers?: Promise<Array<Worker> | undefined>;

  @OneToMany(() => Order, (Order) => Order.company, { nullable: true })
  orders?: Promise<Array<Order> | undefined>;

  @Column({
    type: 'boolean',
    default: true,
  })
  active?: boolean;

  async _shouldNotExist() {
    const exist = await Company.findOne({
      where: {
        owner: {
          id: (await this.owner).id,
        },
        active: true,
      },
    });
    if (exist) throw new ConflictException(Company.CAUSER_HAS_COMPANY);
  }
}
