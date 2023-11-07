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

/**
 * THis column stores user personal infos like country, addresses and so on
 */
@Entity()
export class UserPersonalData extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 70,
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
    length: 250,
  })
  surname: string;

  @Column({
    nullable: false,
    length: 12,
  })
  phoneNumber: string;

  @OneToOne(() => User, (user) => user.personalData, { nullable: false })
  @JoinColumn()
  @Index({ unique: true })
  user: Promise<User>;
}
