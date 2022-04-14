import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/training/createTraining.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Training } from '../database/entity/training.entity';
import { LocalDB } from '../database/localDB.class';
import { TrainingPart } from '../database/entity/trainingPart.entity';
import { UpdateTrainingDto } from './dto/training/updateTraining.dto';
import { ITrainingReturn } from '../interfaces';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private trainingRepository: Repository<Training>,
    @InjectRepository(TrainingPart)
    private trainingPartRepository: Repository<TrainingPart>,
  ) {}
  // db = new LocalDB();
  async createTraining(
    createTrainingDto: CreateTrainingDto,
  ): Promise<ITrainingReturn> {
    try {
      // this.db.saveToLocal(createTrainingDto);
      const addTraining = this.trainingRepository.create(createTrainingDto);
      const parts = createTrainingDto.parts.map((el) => {
        return this.trainingPartRepository.create({
          distance: el.distance,
          duration: el.duration,
          discipline: el.discipline,
        });
      });
      addTraining.parts = parts;
      return await this.trainingRepository.save(addTraining);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getOneTraining(trainingId: string) {
    const res = await this.trainingRepository
      .createQueryBuilder('training')
      .innerJoinAndSelect('training.parts', 'parts')
      .where(`training.id = '${trainingId}'`)
      .getOne();
    return res;
  }

  async getManyTrainings() {
    return await this.trainingRepository
      .createQueryBuilder('training')
      .innerJoinAndSelect('training.parts', 'parts')
      .getMany();
  }

  // deleteOneTraining(id: string) {
  //   throw new Error('Method not implemented.');
  // }

  async updateTraining(updated: UpdateTrainingDto) {
    try {
      const addTraining = { ...updated };
      const parts = updated.parts.map((el) => {
        return this.trainingPartRepository.create({
          distance: el.distance,
          duration: el.duration,
          discipline: el.discipline,
        });
      });
      addTraining.parts = parts;
      return await this.trainingRepository.save(addTraining);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  //   SELECT *
  //   FROM information_schema.columns
  //  WHERE table_schema = 'public'
  //      ;

  async deleteOneTraining(id: string) {
    const res1 = await this.trainingPartRepository
      .createQueryBuilder()
      .delete()
      .from(TrainingPart)
      .where('trainingId = :id', { id: id })
      .execute();

    const res2 = await this.trainingRepository.delete(id);
    return {
      delete1: res1,
      delete2: res2,
    };
  }

  // async deleteOneTraining(id: string) {
  //   return await this.trainingRepository
  //     .createQueryBuilder()
  //     .relation(TrainingPart, 'training_part')
  //     .of(id)
  //     .delete();
  // }

  // async deleteOneTraining(id: string) {
  //   return await this.trainingRepository.delete(id);
  // }
}
