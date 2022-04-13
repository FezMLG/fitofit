import { Test, TestingModule } from '@nestjs/testing';
import { TrainingService } from './training.service';

describe('TrainingService', () => {
  let service: TrainingService;

  const mockTrainingRepository = {
    createTraining: jest.fn(() => {
      Promise.resolve({
        userId: 'ded',
        date: '2021-12-02',
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
            duration: 311,
            id: '4798c262-9b19-4c97-8f62-0fd04dae9473',
          },
        ],
        id: '53e7cd30-9c3c-4258-a0f3-fbba5391a9f4',
        notes: '',
      });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingService],
    })
      .overrideProvider(TrainingService)
      .useValue(mockTrainingRepository)
      .compile();

    service = module.get<TrainingService>(TrainingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
