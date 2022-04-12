import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Training } from './database/entity/Training.entity';
import 'dotenv/config';

export const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  // entities: [Training],
  // entities: ['src/database/entity/*.ts'],
  entities: ['build/**/*.entity{.ts,.js}'],
  migrations: ['build/src/db/migrations*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
