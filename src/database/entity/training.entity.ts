import { UUIDVersion } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrainingPart } from './trainingPart.entity';

@Entity({ name: 'training' })
export class Training {
  @PrimaryGeneratedColumn('uuid')
  id: UUIDVersion;

  @Column({ type: 'text' })
  userId: string;

  @Column({ type: 'date' })
  date: string;

  @OneToMany(() => TrainingPart, (trainingPart) => trainingPart.training, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  parts: TrainingPart[];

  @Column({ type: 'text', default: '' })
  notes: string;
}
