import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from '../../commonEntities/address.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @ManyToOne(() => Address)
  @JoinColumn()
  address: Promise<Address>;

  @OneToOne(() => User, (user) => user.company, { nullable: false })
  @Index({ unique: true })
  @JoinColumn()
  owner: Promise<User>;
}
