import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from '../database/entity/training.entity';
import { ConfigService } from '@nestjs/config';
import { TrainingParts } from '../database/entity/trainingParts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Training, TrainingParts])],
  controllers: [TrainingController],
  providers: [TrainingService, ConfigService],
})
export class TrainingModule {}
