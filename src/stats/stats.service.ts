import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discipline } from '../database/entity/forFutureUse/discipline.entity';
import { Training } from '../database/entity/training.entity';
import { TrainingPart } from '../database/entity/trainingPart.entity';
import { GetStatsDto } from '../dto/stats/getStats.dto';
import { IStatsResponse } from '../interfaces';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Training)
    private trainingRepository: Repository<Training>,
    @InjectRepository(TrainingPart)
    private trainingPartRepository: Repository<TrainingPart>,
  ) {}

  async getStats(getStatsDto: GetStatsDto): Promise<any> {
    let discipline = '';
    if (getStatsDto.discipline) {
      discipline = `discipline = '${getStatsDto.discipline}'`;
    }

    let dateParam = '';
    if (getStatsDto.startDate && getStatsDto.endDate) {
      dateParam = `training.date BETWEEN "${getStatsDto.startDate}" AND "${getStatsDto.endDate}"`;
    } else if (getStatsDto.startDate && !getStatsDto.endDate) {
      dateParam = `training.date >= "${getStatsDto.startDate}"`;
    } else if (getStatsDto.endDate && !getStatsDto.startDate) {
      dateParam = `training.date <= "${getStatsDto.endDate}"`;
    }

    let isAnd = '';
    if (discipline != '' && dateParam != '') {
      isAnd = 'AND';
    }
    const dataToFilter = await this.trainingRepository
      .createQueryBuilder('training')
      .select([
        'MAX(parts.distance)::INTEGER as top_distance',
        'MAX(parts.duration)::INTEGER as top_duration',
        'ROUND(AVG(parts.distance), 2) as avg_distance',
        'ROUND(AVG(parts.duration), 2) as avg_duration',
        'SUM(parts.distance)::INTEGER as sum_distance',
        'SUM(parts.duration)::INTEGER as sum_duration',
      ])
      .innerJoin('training.parts', 'parts')
      .where(`${dateParam} ${isAnd} ${discipline}`)
      .getRawOne();

    const sportData = await this.trainingRepository
      .createQueryBuilder('training')
      .select(['count(discipline) as total, discipline as name'])
      .innerJoin('training.parts', 'parts')
      .where(`${dateParam} ${isAnd} ${discipline}`)
      .groupBy('discipline')
      .orderBy('count(discipline)', 'DESC')
      .getRawMany();

    //todo calculate this badboy with sql instead of this something
    // return sportData;
    const mapSports = sportData.map((el) => {
      return {
        name: el.name,
        total: el.total,
      };
    });
    return {
      request: getStatsDto,
      stats: {
        top: {
          avgSpeed: 1,
          distance: dataToFilter.top_distance,
          duration: dataToFilter.top_duration,
          favoriteSport: {
            name: sportData[0].name,
            total: sportData[0].total,
          },
        },
        avg: {
          avgSpeed: 1,
          distance: Number(dataToFilter.avg_distance),
          duration: Number(dataToFilter.avg_duration),
        },
        total: {
          distance: dataToFilter.sum_distance,
          duration: dataToFilter.sum_duration,
          sport: mapSports,
        },
      },
    };
  }
}
