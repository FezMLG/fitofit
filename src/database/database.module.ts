import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConnectionOptionsFactory } from './typeorm-connection-options.factory';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConnectionOptionsFactory,
    }),
  ],
})
export class DatabaseModule {}
