import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TrainingModule } from '../src/training/training.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Training } from '../src/database/entity/training.entity';
import { TrainingPart } from '../src/database/entity/trainingPart.entity';
import { createHistogram } from 'perf_hooks';
import { any } from 'joi';
import { PassThrough } from 'stream';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const mockTrainingRepository = {
    createTraining: jest.fn(() => {
      Promise.resolve(sampleTrainingReturn);
    }),
    save: jest.fn(() => Promise.resolve(sampleTrainingReturn)),
    create: jest.fn().mockImplementation(() => {
      return {
        userId: 'forTestingPurposes',
        date: '2021-12-02',
        parts: [],
      };
    }),
    delete: jest.fn(() => Promise.resolve({ raw: [], affected: 1 })),
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      execute: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      innerJoinAndSelect: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnValueOnce(sampleTrainingReturn),
      getOne: jest.fn().mockReturnValueOnce(sampleTrainingReturn),
    })),
  };

  const mockTrainingPartRepository = {
    create: jest.fn(() => {
      return {
        discipline: 'bike',
        distance: 123,
        duration: 123,
      };
    }),
    createQueryBuilder: jest.fn(() => ({
      delete: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      execute: jest.fn().mockReturnValueOnce({ raw: [], affected: 1 }),
      where: jest.fn().mockReturnThis(),
    })),
  };

  const sampleTraining = {
    userId: 'forTestingPurposes',
    date: '2021-12-02',
    parts: [
      {
        discipline: 'bike',
        distance: 123,
        duration: 123,
      },
    ],
  };

  const sampleTrainingReturn = {
    userId: 'forTestingPurposes',
    date: '2021-12-02',
    parts: [
      {
        discipline: 'bike',
        distance: 123,
        duration: 123,
        id: '7777a883-8bc9-40c0-85bd-84372bc0bf98',
      },
    ],
    id: '53e7cd30-9c3c-4258-a0f3-fbba5391a9f4',
    notes: '',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TrainingModule],
    })
      .overrideProvider(getRepositoryToken(Training))
      .useValue(mockTrainingRepository)
      .overrideProvider(getRepositoryToken(TrainingPart))
      .useValue(mockTrainingPartRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/training (POST)', () => {
    return request(app.getHttpServer())
      .post('/training')
      .send(sampleTraining)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(sampleTrainingReturn);
      });
  });

  it('/training (GET)', () => {
    return request(app.getHttpServer())
      .get('/training')
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toEqual(sampleTrainingReturn);
      });
  });

  describe('/training/:id (GET)', () => {
    it('should return one training with given id', () => {
      request(app.getHttpServer()).post('/training').send(sampleTraining);
      return request(app.getHttpServer())
        .get('/training/53e7cd30-9c3c-4258-a0f3-fbba5391a9f4')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body).toEqual(sampleTrainingReturn);
        });
    });

    it('should return id not found', () => {
      const givenId = 'ba5391a9f4';
      return request(app.getHttpServer())
        .get(`/training/${givenId}`)
        .expect('Content-Type', /json/)
        .then((response) => {
          if (response.body.id == givenId) {
            fail();
          }
        });
    });
  });

  it('/training/:id (PUT)', () => {
    request(app.getHttpServer()).post('/training').send(sampleTraining);
    return request(app.getHttpServer())
      .put('/training')
      .send(sampleTrainingReturn)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).toEqual({
          statusCode: 200,
          message: `Updated`,
        });
      });
  });
});