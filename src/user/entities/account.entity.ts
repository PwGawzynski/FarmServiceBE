import {
  BaseEntity,
  Column,
  Entity,
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

  @OneToOne(() => User, (user) => user.account)
  user: Promise<User>;
}
