import { Connection, getConnection } from 'typeorm';

export class DatabaseCleaner {
  constructor(
    private readonly connection: Connection = getConnection(
      process.env.NODE_ENV,
    ),
  ) {}

  public async cleanup() {
    const { connection } = this;

    if (!connection.isConnected) {
      await connection.connect();
    }
    const tables = this.connection.entityMetadatas
      .filter((metadata) => metadata.tableType === 'regular')
      .map((metadata) => `${metadata.schema}.${metadata.tableName}`);

    return this.connection.query(
      `TRUNCATE TABLE ${tables.join(', ')} RESTART IDENTITY CASCADE`,
    );
  }
}

export const cleanupBeforeEachSpec = () =>
  beforeEach(() => new DatabaseCleaner().cleanup());
