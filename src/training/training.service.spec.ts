import { ModuleRef } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { sample } from 'rxjs';
import { Training } from '../database/entity/training.entity';
import { TrainingPart } from '../database/entity/trainingPart.entity';
import { Discipline } from '../interfaces';
import { TrainingService } from './training.service';

describe('TrainingService', () => {
  let service: TrainingService;

  const mockTrainingRepository = {
    createTraining: jest.fn(() => {
      Promise.resolve(sampleTrainingReturn);
    }),
    save: jest.fn().mockImplementation(() => {
      Promise.resolve(sampleTrainingReturn);
    }),
    create: jest.fn().mockImplementation(() => {
      Promise.resolve();
    }),
  };

  const mockTrainingPartRepository = {
    create: jest.fn().mockImplementation(() => {
      Promise.resolve();
    }),
  };

  const sampleTraining = {
    userId: 'forTestingPurposes',
    date: '2005-04-02',
    parts: [
      {
        discipline: 'bike' as Discipline,
        distance: 123,
        duration: 123,
      },
      {
        discipline: 'running' as Discipline,
        distance: 321,
        duration: 312,
      },
    ],
  };

  const sampleTrainingReturn = {
    userId: 'forTestingPurposes',
    date: '2005-04-02',
    parts: [
      {
        discipline: 'bike',
        distance: 123,
        duration: 123,
        id: '7777a883-8bc9-40c0-85bd-84372bc0bf98',
      },
      {
        discipline: 'running',
        distance: 312,
        duration: 312,
        id: '4798c262-9b19-4c97-8f62-0fd04dae9473',
      },
    ],
    id: '53e7cd30-9c3c-4258-a0f3-fbba5391a9f4',
    notes: '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingService],
    })
      .overrideProvider(getRepositoryToken(Training))
      .useValue(mockTrainingRepository)
      .overrideProvider(getRepositoryToken(TrainingPart))
      .useValue(mockTrainingPartRepository)
      .compile();

    service = module.get<TrainingService>(TrainingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create training and return it', async () => {
    const create = await service.createTraining(sampleTraining);
    expect(create).toEqual(sampleTrainingReturn);
  });
});
