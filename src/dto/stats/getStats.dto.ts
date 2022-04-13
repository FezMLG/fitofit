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
import { Discipline, IStatsRequest } from '../../interfaces';

export class GetStatsDto implements IStatsRequest {
  @IsString()
  @IsOptional()
  readonly startDate?: string;

  @IsString()
  @IsOptional()
  readonly endDate?: string;

  @IsString()
  @IsOptional()
  readonly discipline?: Discipline;
}
