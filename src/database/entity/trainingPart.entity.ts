import { UUIDVersion } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Discipline } from './discipline.entity';
import { Training } from './training.entity';

@Entity()
export class TrainingPart {
  @PrimaryGeneratedColumn('uuid')
  id: UUIDVersion;

  // @OneToOne(() => Discipline)
  // @JoinColumn()
  // disciplineId: Discipline;

  @ManyToOne(() => Training, (training) => training.parts)
  training: Training;

  @Column({ type: 'text' })
  discipline: string;

  @Column({ type: 'integer' })
  distance: number;

  @Column({ type: 'integer' })
  duration: number;
}
