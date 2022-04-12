import { UUIDVersion } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Training } from './training.entity';

@Entity()
export class TrainingParts {
  @PrimaryGeneratedColumn('uuid')
  id: UUIDVersion;

  @Column({ type: 'text' })
  userId: string;

  @ManyToOne(() => Training, (training) => training.id)
  trainingId: string;

  @Column({ type: 'text' })
  disciplineId: string;

  @Column({ type: 'integer' })
  distance: number;

  @Column({ type: 'integer' })
  duration: number;
}
