import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrainingDto } from '../dto/training/createTraining.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Training } from '../database/entity/training.entity';
import { LocalDB } from '../database/localDB.class';
import { TrainingParts } from '../database/entity/trainingParts.entity';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(TrainingParts)
    private trainingPartsRepository: Repository<TrainingParts>,
    @InjectRepository(Training)
    private trainingRepository: Repository<Training>,
  ) {}
  db = new LocalDB();
  async createTraining(createTrainingDto: CreateTrainingDto) {
    try {
      this.db.saveToLocal(createTrainingDto);
      const addTraining = await this.trainingRepository.save({
        date: createTrainingDto.date,
        userId: createTrainingDto.userId,
        notes: createTrainingDto.notes,
      });
      if (addTraining.id) {
        createTrainingDto.parts.forEach(async (el) => {
          return await this.trainingPartsRepository.save({
            userId: createTrainingDto.userId,
            trainingId: String(addTraining.id),
            disciplineId: el.discipline,
            distance: el.distanceInMeters,
            duration: el.durationInSeconds,
          });
        });
      } else {
        throw new HttpException(
          'Failed to create workout',
          HttpStatus.BAD_REQUEST,
        );
      }
      return {
        statusCode: 201,
        message: 'added',
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
