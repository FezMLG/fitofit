import { ParseUUIDPipe } from '@nestjs/common';
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
  IsUUID,
  IS_UUID,
} from 'class-validator';

export class GetOneTrainingDto {
  // @Type(() => String)
  // @IsUUID('4')
  readonly id: string;
}
