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
import { cleanupBeforeEachSpec } from './database-cleaner';

describe('AppController (e2e)', () => {
  let app: INestApplication;

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
        id: expect.any(String),
      },
    ],
    id: expect.any(String),
    notes: '',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  cleanupBeforeEachSpec();

  it('/training (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/training')
      .send(sampleTraining)
      .expect('Content-Type', /json/)
      .expect(201);
    expect(response.body).toEqual(sampleTrainingReturn);
  });

  it('/training (GET)', async () => {
    await request(app.getHttpServer()).post('/training').send(sampleTraining);
    const response = await request(app.getHttpServer())
      .get('/training')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(response.body).toEqual([sampleTrainingReturn]);
  });

  describe('/training/:id (GET)', () => {
    it('should return one training with given id', async () => {
      await request(app.getHttpServer()).post('/training').send(sampleTraining);
      const data = await request(app.getHttpServer()).get('/training');
      console.log(data.body);
      const id = data.body[0].id;
      const response = await request(app.getHttpServer())
        .get(`/training/${id}`)
        .expect(200)
        .expect('Content-Type', /json/);
      expect(response.body).toEqual(sampleTrainingReturn);
    });

    it('should return id not found', async () => {
      const givenId = '86cb36d5-dbd8-47cc-848f-85f7c6e56b11';
      request(app.getHttpServer())
        .get(`/training/${givenId}`)
        .expect(404)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body).toEqual({
            statusCode: 404,
            message: 'Could not find training by given id',
          });
        });
    });

    it('should return id must be a UUID', async () => {
      const givenId = 'ba5391a9f4';
      request(app.getHttpServer())
        .get(`/training/${givenId}`)
        .expect(400)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body).toEqual({
            statusCode: 400,
            message: 'Probably there is not valid uuid',
          });
        });
    });
  });

  it('/training/:id (PUT)', async () => {
    request(app.getHttpServer()).post('/training').send(sampleTraining);
    const response = await request(app.getHttpServer())
      .put('/training')
      .send(sampleTrainingReturn)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(response.body).toEqual({
      statusCode: 200,
      message: `Updated`,
    });
  });
});
