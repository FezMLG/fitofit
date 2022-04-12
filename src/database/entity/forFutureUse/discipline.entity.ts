import { UUIDVersion } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TrainingPart } from '../trainingPart.entity';

@Entity()
export class Discipline {
  @PrimaryGeneratedColumn('uuid')
  id: UUIDVersion;

  @Column({ type: 'text' })
  name: string;
}
