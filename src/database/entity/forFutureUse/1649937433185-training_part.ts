// import {
//   MigrationInterface,
//   QueryRunner,
//   Table,
//   TableForeignKey,
// } from 'typeorm';

// export class trainingPart1649937433185 implements MigrationInterface {
//   name = 'trainingPart1649937433185';

//   table = new Table({
//     name: 'training_part',
//     columns: [
//       {
//         name: 'id',
//         type: 'uuid',
//         isPrimary: true,
//         isGenerated: true,
//         generationStrategy: 'uuid',
//         default: 'uuid_generate_v4()',
//       },
//       {
//         name: 'trainingId',
//         type: 'uuid',
//       },
//       {
//         name: 'discipline',
//         type: 'text',
//       },
//       {
//         name: 'distance',
//         type: 'integer',
//       },
//       {
//         name: 'duration',
//         type: 'integer',
//       },
//     ],
//   });

//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.createTable(this.table);
//     await queryRunner.createForeignKey(
//       'training_part',
//       new TableForeignKey({
//         columnNames: ['training'],
//         referencedTableName: 'training',
//         referencedColumnNames: ['id'],
//       }),
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.dropTable(this.table);
//   }
// }
