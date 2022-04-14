import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsArray,
  UUIDVersion,
  ValidateNested,
} from 'class-validator';
import { Discipline, IPartialWorkout } from '../../../interfaces';

class WorkoutDto {
  id: UUIDVersion;
  discipline: string;
  distance: number;
  duration: number;
}

export class UpdateTrainingDto {
  @IsString()
  readonly id: UUIDVersion;

  @IsString()
  readonly userId: string;

  @IsString()
  readonly date: string;

  // @ValidateNested({ each: true })
  // @Type(() => WorkoutDto)
  @IsArray()
  readonly parts: WorkoutDto[];

  @IsString()
  @IsOptional()
  readonly notes?: string;
}
