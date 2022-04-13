import { Body, Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetStatsDto } from '../dto/stats/getStats.dto';
import { TrainingService } from '../training/training.service';
import { StatsService } from './stats.service';

@ApiTags('stats')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  async getStats(@Body() getStatsDto: GetStatsDto) {
    return await this.statsService.getStats(getStatsDto);
  }
}
