import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Training } from './entity/training.entity';
import 'dotenv/config';
import { TrainingPart } from './entity/trainingPart.entity';

module.exports = [
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
    name: 'production',
    type: 'postgres',
    url: process.env.DATABASE_URL,
    schema: 'public',
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
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
    keepConnectionAlive: true,

    synchronize: true,
    // migrationsRun: true,

    logging: process.env.DATABASE_LOGGING === 'true',

    autoLoadEntities: true,

    entities: ['./src/**/*.entity.ts'], // tests run on TS directly
    migrations: ['./src/**/migrations/*.ts'],
    migrationsTableName: 'migrations',

    cli: {
      migrationsDir: './src/migrations',
    },
  },
  {
    name: 'development',
    type: 'postgres',
    schema: 'public',
    url: process.env.DATABASE_URL,
    synchronize: true,
    // migrationsRun: true,

    logging: process.env.DATABASE_LOGGING === 'true',

    autoLoadEntities: true,
    // entities: [Training, TrainingPart],
    entities: ['build/**/*.entity{.ts,.js}'],
    migrations: ['build/database/migrations/*.js'],
    migrationsTableName: 'migrations',

    cli: {
      migrationsDir: 'src/database/migrations',
    },
  },
];
