import { Module } from '@nestjs/common';
import { TrainingModule } from './training/training.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './env.validation';
import { StatsModule } from './stats/stats.module';
import { DatabaseModule } from './database/database.module';

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
    DatabaseModule,
    TrainingModule,
    StatsModule,
  ],
})
export class AppModule {}
