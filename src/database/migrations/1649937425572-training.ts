import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class training1649937425572 implements MigrationInterface {
  name = 'training1649937425572';

  table = new Table({
    name: 'training',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'userId',
        type: 'text',
      },
      {
        name: 'date',
        type: 'date',
      },
      {
        name: 'notes',
        type: 'text',
        default: null,
        isNullable: true,
      },
    ],
  });

  table2 = new Table({
    name: 'training_part',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'trainingId',
        type: 'uuid',
      },
      {
        name: 'discipline',
        type: 'text',
      },
      {
        name: 'distanceInMeters',
        type: 'integer',
      },
      {
        name: 'durationInSeconds',
        type: 'integer',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createTable(this.table2);
    await queryRunner.createForeignKey(
      'training_part',
      new TableForeignKey({
        columnNames: ['trainingId'],
        referencedTableName: 'training',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
    await queryRunner.dropTable(this.table2);
  }
}
