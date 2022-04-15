import { ApiProperty } from '@nestjs/swagger';
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
  IsNumber,
} from 'class-validator';
import { Discipline, IPartialWorkout } from '../../../interfaces';

class WorkoutDto implements IPartialWorkout {
  @IsString()
  discipline: Discipline;
  @IsNumber()
  distanceInMeters: number;
  @IsNumber()
  durationInSeconds: number;
}

export class CreateTrainingDto {
  @IsString()
  @ApiProperty({
    description: 'user id',
    default: 'testUserId',
  })
  readonly userId: string;

  @IsString()
  @ApiProperty({
    description: 'The date of training',
    default: '2022-02-12',
  })
  readonly date: string;

  @ValidateNested({ each: true })
  @Type(() => WorkoutDto)
  @IsArray()
  @ApiProperty({
    description: 'Array of parts of workout',
    default: {
      discipline: 'bike',
      distanceInMeters: 123,
      durationInSeconds: 321,
    },
  })
  readonly parts: WorkoutDto[];

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The starting address',
    default: 'Grzybowska 62, 00-844 Warszawa',
  })
  readonly notes?: string;
}
