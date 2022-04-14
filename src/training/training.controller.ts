import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTrainingDto } from './dto/training/createTraining.dto';
import { UpdateTrainingDto } from './dto/training/updateTraining.dto';
import { TrainingService } from './training.service';

@ApiTags('training')
@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post()
  async createTraining(@Body() createTrainingDto: CreateTrainingDto) {
    const res = this.trainingService.createTraining(createTrainingDto);
    return res;
  }

  @Put()
  async updateTraining(@Body() update: UpdateTrainingDto) {
    const res = this.trainingService.updateTraining(update);
    if (!res) {
      throw new HttpException(
        'Could not update training',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return {
        statusCode: 200,
        message: `Updated`,
      };
    }
  }

  @Get(':id')
  async getOneTraining(@Param('id') id: string) {
    const res = await this.trainingService.getOneTraining(id);
    if (!res) {
      throw new HttpException(
        'Could not find training by given id',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return res;
    }
  }

  @Get()
  async getManyTraining() {
    return await this.trainingService.getManyTrainings();
  }

  @Delete(':id')
  async deleteOneTraining(@Param('id') id: string) {
    const res = await this.trainingService.deleteOneTraining(id);
    if (res) {
      return {
        statusCode: 200,
        message: `Deleted ${res.delete2.affected} trainings and ${res.delete1.affected} parts.`,
      };
    }
    return res;
  }
}
