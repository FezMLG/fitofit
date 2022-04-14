import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Training } from './database/entity/Training.entity';
import 'dotenv/config';
import { TrainingPart } from './database/entity/trainingPart.entity';

// module.exports = [
//   {
//     name: 'old',
//     type: 'postgres',
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     username: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     database: process.env.POSTGRES_DB,
//     synchronize: true,
//     // entities: [Training],
//     // entities: ['src/database/entity/*.ts'],
//     entities: ['build/**/*.entity{.ts,.js}'],
//     migrations: ['build/src/db/migrations*.js'],
//     cli: {
//       migrationsDir: 'src/db/migrations',
//     },
//     logging: true,
//   },
//   {
//     name: 'default', //for all environments
//     type: 'postgres',
//     url: process.env.DATABASE_URL,
//     schema: 'public',

//     synchronize: false,
//     migrationsRun: true,

//     logging: process.env.DATABASE_LOGGING === 'true',

//     autoLoadEntities: true,

//     entities: ['build/**/*.entity.js'],
//     migrationsTableName: 'migrations',

//     cli: {
//       migrationsDir: './src/migrations',
//     },
//   },
//   {
//     name: 'test',
//     type: 'postgres',
//     schema: 'public',
//     url: process.env.DATABASE_URL,
//     synchronize: false,
//     migrationsRun: true,

//     logging: process.env.DATABASE_LOGGING === 'true',

//     autoLoadEntities: true,
//     entities: ['src/database/entity/*.entity.ts'],
//     migrations: ['./packages/backend/src/**/migrations/*.ts'],
//     migrationsTableName: 'migrations',

//     cli: {
//       migrationsDir: './packages/backend/src/migrations',
//     },
//   },
// ];

// module.exports = {
//   type: 'postgres',
//   url: process.env.DATABASE_URL,
//   synchronize: true,
//   // entities: [Training],
//   // entities: ['src/database/entity/*.ts'],
//   entities: ['build/**/*.entity{.ts,.js}'],
//   migrations: ['build/src/db/migrations*.js'],
//   cli: {
//     migrationsDir: 'src/db/migrations',
//   },
//   logging: true,
// };

const ormConfig: PostgresConnectionOptions = {
  name: 'default', //for all environments
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  // entities: [Training, TrainingPart],
  // entities: ['src/database/entity/*.ts'],
  entities: ['build/**/*.entity{.ts,.js}'],
  migrations: ['build/src/database/migrations*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  logging: true,
};

export = ormConfig;
