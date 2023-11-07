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

export enum Theme {
  dark,
  light,
}

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
  theme: Theme;

  @Column({
    type: 'uuid',
    nullable: true,
    default: null,
    length: 36,
  })
  activationCode: string;

  @Column({
    default: false,
  })
  isActivated: boolean;

  @OneToOne(() => User, (user) => user.account, { nullable: false })
  @JoinColumn()
  @Index({
    unique: true,
  })
  user: Promise<User>;
}
