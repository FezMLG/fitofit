import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NodeEnvironment } from '../node-environment';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ormConfigurations: TypeOrmModuleOptions[] = require('./../ormconfig');

export const typeOrmConnectionOptionsFactory = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const nodeEnv = configService.get('NODE_ENV') as NodeEnvironment;
  const databaseUrl = configService.get('DATABASE_URL') as string;

  let ormConfigName = 'default';

  if (nodeEnv === NodeEnvironment.Test) {
    ormConfigName = NodeEnvironment.Test;
  }

  const ormConfig = ormConfigurations.find((x) => x.name === ormConfigName);

  if (!ormConfig) {
    throw new Error(
      `TypeORM config: "${ormConfigName}" could not be found. Please check ormconfig.ts file`,
    );
  }
  return {
    ...ormConfig,
    url: databaseUrl,
    name: 'default',
  } as PostgresConnectionOptions;
};
