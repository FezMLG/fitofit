import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrainingDto } from '../dto/training/createTraining.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Training } from '../database/entity/training.entity';
import { LocalDB } from '../database/localDB.class';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private trainingRepository: Repository<Training>,
  ) {}
  db = new LocalDB();
  async createTraining(createTrainingDto: CreateTrainingDto) {
    try {
      this.db.saveToLocal(createTrainingDto);
      return await this.trainingRepository.save({
        date: createTrainingDto.date,
        userId: createTrainingDto.userId,
        disciplineId: createTrainingDto.parts.discipline,
        distance: createTrainingDto.parts.distanceInMeters,
        duration: createTrainingDto.parts.durationInSeconds,
        notes: createTrainingDto.notes,
      });
      return {
        statusCode: 201,
        message: 'added',
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
