import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrainingDto } from '../dto/training/createTraining.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Training } from '../database/entity/training.entity';
import { LocalDB } from '../database/localDB.class';
import { TrainingPart } from '../database/entity/trainingPart.entity';
import { Discipline } from '../database/entity/discipline.entity';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private trainingRepository: Repository<Training>,
    @InjectRepository(TrainingPart)
    private trainingPartRepository: Repository<TrainingPart>,
    @InjectRepository(Discipline)
    private disciplineRepository: Repository<Discipline>,
  ) {}
  db = new LocalDB();
  async createTraining(createTrainingDto: CreateTrainingDto) {
    try {
      this.db.saveToLocal(createTrainingDto);
      const addTraining = this.trainingRepository.create(createTrainingDto);
      const parts = createTrainingDto.parts.map((el) => {
        return this.trainingPartRepository.create({
          distance: el.distanceInMeters,
          duration: el.durationInSeconds,
          discipline: el.discipline,
        });
      });
      addTraining.parts = parts;
      return await this.trainingRepository.save(addTraining);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getTraining(trainingId: string) {
    return await this.trainingRepository
      .createQueryBuilder('training')
      .innerJoinAndSelect('training.parts', 'parts')
      .where(`'training_part.trainingId' = '${trainingId}'`)
      .getOne();
  }
}
