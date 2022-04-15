import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { cleanupBeforeEachSpec } from './database-cleaner';

describe.skip('AppController (e2e)', () => {
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

  cleanupBeforeEachSpec();

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
