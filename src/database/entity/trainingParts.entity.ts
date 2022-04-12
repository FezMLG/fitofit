import { UUIDVersion } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TrainingParts {
  @PrimaryGeneratedColumn('uuid')
  id: UUIDVersion;

  @Column({ type: 'text' })
  userId: string;

  @Column({ type: 'text' })
  trainingId: string;

  @Column({ type: 'text' })
  disciplineId: string;

  @Column({ type: 'integer' })
  distance: number;

  @Column({ type: 'integer' })
  duration: number;
}
