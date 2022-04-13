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

  async getStats(getStatsDto: GetStatsDto): Promise<IStatsResponse> {
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
      .innerJoinAndSelect('training.parts', 'parts')
      .where(`${dateParam} ${isAnd} ${discipline}`)
      .getMany();

    const calcSum = (what: 'distance' | 'duration') => {
      let toReturn = 0;
      if (what == 'distance') {
        dataToFilter.map((el) => {
          el.parts.map((ele) => {
            toReturn += ele.distance;
          });
        });
      } else if (what == 'duration') {
        dataToFilter.map((el) => {
          el.parts.map((ele) => {
            toReturn += ele.duration;
          });
        });
      }
      return toReturn;
    };

    const calcAvg = (what: 'distance' | 'duration') => {
      let toReturn = 0;
      let howMany = 0;
      if (what == 'distance') {
        dataToFilter.map((el) => {
          el.parts.map((ele) => {
            toReturn += ele.distance;
            howMany++;
          });
        });
      } else if (what == 'duration') {
        dataToFilter.map((el) => {
          el.parts.map((ele) => {
            toReturn += ele.duration;
            howMany++;
          });
        });
      }
      if (howMany == 0) {
        return toReturn;
      } else {
        return toReturn / howMany;
      }
    };

    const calcTop = (what: 'distance' | 'duration') => {
      let toReturn = 0;
      if (what == 'distance') {
        dataToFilter.map((el) => {
          el.parts.map((ele) => {
            if (toReturn < ele.distance) {
              toReturn = ele.distance;
            }
          });
        });
      } else if (what == 'duration') {
        dataToFilter.map((el) => {
          el.parts.map((ele) => {
            if (toReturn < ele.duration) {
              toReturn = ele.duration;
            }
          });
        });
      }
      return toReturn;
    };

    //todo calculate this badboy with sql instead of this something

    return {
      request: getStatsDto,
      stats: {
        top: {
          avgSpeed: 1,
          distance: calcTop('distance'),
          duration: calcTop('duration'),
          favoriteSport: {
            name: 's',
            total: 1,
          },
        },
        avg: {
          avgSpeed: 1,
          distance: calcAvg('distance'),
          duration: calcAvg('duration'),
        },
        total: {
          distance: calcSum('distance'),
          duration: calcSum('duration'),
          sport: [
            {
              name: 's',
              total: 1,
            },
          ],
        },
      },
    };
  }
}
