import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TrainingModule } from '../src/training/training.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Training } from '../src/database/entity/training.entity';
import { TrainingPart } from '../src/database/entity/trainingPart.entity';
import { createHistogram } from 'perf_hooks';
import { any } from 'joi';
import { PassThrough } from 'stream';
import { StatsModule } from '../src/stats/stats.module';
import ormConfig = require('../src/ormconfig');

describe('AppController (e2e)', () => {
  let app: INestApplication;

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
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/stats (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/stats')
      .send()
      .expect('Content-Type', /json/)
      .expect(201);
    expect(response.body).toEqual({
      request: {},
      stats: {
        top: {
          avgSpeed: expect.any(Number),
          distance: expect.any(Number),
          duration: expect.any(Number),
          favoriteSport: {
            name: expect.any(String),
            total: expect.any(String),
          },
        },
        avg: {
          avgSpeed: expect.any(Number),
          distance: expect.any(Number),
          duration: expect.any(Number),
        },
        total: {
          distance: expect.any(Number),
          duration: expect.any(Number),
          sport: [
            {
              name: expect.any(String),
              total: expect.any(String),
            },
            {
              name: expect.any(String),
              total: expect.any(String),
            },
            {
              name: expect.any(String),
              total: expect.any(String),
            },
          ],
        },
      },
    });
  });
});
