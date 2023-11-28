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
import { Company } from '../../company/entities/company.entity';
import { Task } from '../../task/entities/task.entity';
import { ConflictException } from '@nestjs/common';
import { Position, Status } from '../../../FarmServiceTypes/Worker/Enums';

@Entity()
export class Worker extends BaseEntity {
  constructor(options?: {
    user: Promise<User>;
    company: Promise<Company>;
    tasks?: Promise<Task[]>;
  }) {
    super();
    if (options) {
      this.user = options.user;
      this.company = options.company;
      this.tasks = options.tasks;
    }
  }

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

  @Column({
    type: 'enum',
    enum: Position,
    default: Position.Operator,
  })
  position?: Position;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.Active,
  })
  status?: Status;

  async _shouldNotExist() {
    const exist = await Worker.findOne({
      where: {
        user: {
          id: (await this.user).id,
        },
      },
    });
    if (exist)
      throw new ConflictException('Given user is already registered as worker');
  }
}
