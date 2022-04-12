import { Body, Controller, Post } from '@nestjs/common';
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
}
