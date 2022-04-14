import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Training } from './database/entity/Training.entity';
import 'dotenv/config';
import { TrainingPart } from './database/entity/trainingPart.entity';

module.exports = [
  {
    name: 'old',
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    // entities: [Training, TrainingPart],
    // entities: ['src/database/entity/*.ts'],
    entities: ['build/**/*.entity{.ts,.js}'],
    migrations: ['build/database/migrations/*.js'],
    cli: {
      migrationsDir: 'src/database/migrations',
    },
    logging: true,
  },
  {
    name: 'default', //for all environments
    type: 'postgres',
    url: process.env.DATABASE_URL,
    schema: 'public',

    synchronize: false,
    migrationsRun: true,

    logging: process.env.DATABASE_LOGGING === 'true',

    autoLoadEntities: true,

    entities: ['build/**/*.entity{.ts,.js}'],
    migrations: ['build/database/migrations/*.js'],

    cli: {
      migrationsDir: 'src/database/migrations',
    },
  },
  {
    name: 'test',
    type: 'postgres',
    schema: 'public',
    url: process.env.DATABASE_URL,
    synchronize: false,
    migrationsRun: true,

    logging: process.env.DATABASE_LOGGING === 'true',

    autoLoadEntities: true,
    entities: [Training, TrainingPart],
    // entities: ['build/**/*.entity{.ts,.js}'],
    migrations: ['build/database/migrations/*.js'],
    migrationsTableName: 'migrations',

    cli: {
      migrationsDir: 'src/database/migrations',
    },
  },
];
