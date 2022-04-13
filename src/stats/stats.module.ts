import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from '../database/entity/training.entity';
import { TrainingPart } from '../database/entity/trainingPart.entity';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Training, TrainingPart])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
