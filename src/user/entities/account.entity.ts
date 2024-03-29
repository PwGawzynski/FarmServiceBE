import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Theme } from '../../../FarmServiceTypes/Account/Constants';

/**
 * This table contains information about user
 * account data like settings and nickname, email and so on
 */
@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    enum: Theme,
    type: 'enum',
    default: Theme.dark,
  })
  theme?: Theme;

  @Column({
    type: 'uuid',
    nullable: true,
    default: null,
    length: 36,
  })
  activationCode?: string;

  @Column({
    default: false,
  })
  isActivated?: boolean;

  @OneToOne(() => User, (user) => user.account, { nullable: false })
  @JoinColumn()
  @Index('UNIQ_USER', {
    unique: true,
  })
  user: Promise<User>;
}
