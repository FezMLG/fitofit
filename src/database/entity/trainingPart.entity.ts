import { UUIDVersion } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Training } from './training.entity';

@Entity({ name: 'training_part' })
export class TrainingPart {
  @PrimaryGeneratedColumn('uuid')
  id: UUIDVersion;

  // @ManyToOne(() => Discipline, (discipline) => discipline.name)
  // @JoinColumn()
  // discipline: string;

  @ManyToOne(() => Training, (training) => training.parts)
  training: Training;

  @Column({ type: 'text' })
  discipline: string;

  @Column({ type: 'integer' })
  distance: number;

  @Column({ type: 'integer' })
  duration: number;
}
