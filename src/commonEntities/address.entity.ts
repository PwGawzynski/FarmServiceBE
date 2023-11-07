import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/entities/user.entity';

/**
 * This column represents all address in application, is used to store both user and company addresses
 */
@Entity()
export class Address extends BaseEntity {
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
  voivodeship: string;

  @Column({
    length: 6,
    nullable: false,
  })
  postalCode: string;

  @Column({
    length: 100,
    nullable: true,
  })
  street: string;

  @Column({
    length: 20,
    nullable: false,
  })
  houseNumber: string;

  @Column({
    length: 20,
    nullable: true,
  })
  apartmentNumber: string;


  @OneToOne(() => User, (user) => user.address, { nullable: false })
  @JoinColumn()
  @Index({ unique: true })
  user: Promise<User>;
}
