import { UUIDVersion } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Training {
  @PrimaryGeneratedColumn('uuid')
  id: UUIDVersion;

  @Column({ type: 'text' })
  userId: string;

  @Column({ type: 'text' })
  disciplineId: string;

  @Column({ type: 'number' })
  distance: string;

  @Column({ type: 'number' })
  duration: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'text', default: '' })
  notes: string;
}
