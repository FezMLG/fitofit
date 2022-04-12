import { Type } from 'class-transformer';
import {
  IsString,
  IsPositive,
  IsDateString,
  MaxDate,
  IsDate,
  ValidateNested,
  IsOptional,
  IsObject,
  IsArray,
} from 'class-validator';
import { Discipline, IPartialWorkout } from '../../interfaces';

class WorkoutDto implements IPartialWorkout {
  discipline: Discipline;
  distanceInMeters: number;
  durationInSeconds: number;
}

export class CreateTrainingDto {
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
