import { Module } from '@nestjs/common';
import { TrainingModule } from './training/training.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validationSchema,
    }),
    TypeOrmModule.forRoot(ormConfig),
    TrainingModule,
  ],
})
export class AppModule {}
