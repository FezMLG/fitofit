import { Module } from '@nestjs/common';
import { TrainingModule } from './training/training.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
// import * as ormConfig from './ormconfig';
import { StatsModule } from './stats/stats.module';
import ormConfig = require('./ormconfig');

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV || 'development'}.local`,
        '.env',
        `.env.${process.env.NODE_ENV || 'development'}`,
      ],
      isGlobal: true,
      expandVariables: true,
      validationSchema,
    }),
    TypeOrmModule.forRoot(ormConfig),
    TrainingModule,
    StatsModule,
  ],
})
export class AppModule {}
