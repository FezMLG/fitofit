import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsArray,
  UUIDVersion,
  ValidateNested,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { Discipline, IPartialWorkout } from '../../../interfaces';

class WorkoutDto {
  @IsUUID()
  id: UUIDVersion;
  @IsString()
  discipline: string;
  @IsNumber()
  distanceInMeters: number;
  @IsNumber()
  durationInSeconds: number;
}

export class UpdateTrainingDto {
  @IsUUID()
  readonly id: UUIDVersion;

  @IsString()
  readonly userId: string;

  @IsString()
  readonly date: string;

  @ValidateNested({ each: true })
  @Type(() => WorkoutDto)
  @IsArray()
  readonly parts: WorkoutDto[];

  @IsString()
  @IsOptional()
  readonly notes?: string;
}
