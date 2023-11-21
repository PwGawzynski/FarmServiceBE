import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Company } from '../../company/entities/company.entity';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class Worker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.worker, {
    nullable: false,
  })
  @Index('UNIQ_USER', { unique: true })
  @JoinColumn()
  user: Promise<User>;

  @ManyToOne(() => Company, (company) => company.workers, { nullable: false })
  @JoinColumn()
  company: Promise<Company>;

  @OneToMany(() => Task, (task) => task.worker, { nullable: true })
  tasks?: Promise<Task[]>;
}
