import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from '../database/entity/training.entity';
import { ConfigService } from '@nestjs/config';
import { TrainingPart } from '../database/entity/trainingPart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Training, TrainingPart]),
    // TypeOrmModule.forFeature([Training, TrainingPart], process.env.NODE_ENV),
  ],
  controllers: [TrainingController],
  providers: [TrainingService, ConfigService],
})
export class TrainingModule {}
