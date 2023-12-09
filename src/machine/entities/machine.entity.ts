import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { ConflictException } from '@nestjs/common';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class Machine extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  @Index('UNIQ_LICENSE_PLATE', { unique: true })
  licensePlate: string;

  @ManyToOne(() => Company, (company) => company.machines, { nullable: false })
  company: Promise<Company>;

  @ManyToMany(() => Task, (task) => task.machines)
  tasks: Promise<Task[] | null>;

  async _shouldNotExist() {
    const exist = await Machine.findOne({
      where: {
        licensePlate: this.licensePlate,
      },
    });
    if (exist)
      throw new ConflictException('License plate number is already registered');
  }
}
