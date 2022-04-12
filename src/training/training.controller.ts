import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTrainingDto } from '../dto/training/createTraining.dto';
import { TrainingService } from './training.service';

@ApiTags('training')
@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post('add')
  createTraining(@Body() createTrainingDto: CreateTrainingDto) {
    const res = this.trainingService.createTraining(createTrainingDto);
    return res;
  }

  @Get(':id')
  async getOneTraining(@Param('id') id: string) {
    return await this.trainingService.getOneTraining(id);
  }

  @Get()
  async getManyTraining() {
    return await this.trainingService.getManyTrainings();
  }

  @Delete(':id')
  async deleteOneTraining(@Param('id') id: string) {
    return await this.trainingService.deleteOneTraining(id);
  }
}
