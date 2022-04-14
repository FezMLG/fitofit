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
import { cleanupBeforeEachSpec } from './database-cleaner';

describe('AppController (e2e)', () => {
  // cleanupBeforeEachSpec();
  let app: INestApplication;

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
    console.log(process.env.NODE_ENV);
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
          // sport: [
          //   {
          //     name: expect.any(String),
          //     total: expect.any(String),
          //   },
          // ],
          sport: expect.any(Array),
        },
      },
    });
  });
});
