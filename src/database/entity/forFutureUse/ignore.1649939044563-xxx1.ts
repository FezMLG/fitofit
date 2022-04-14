// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class xxx11649939044563 implements MigrationInterface {
//   name = 'xxx11649939044563';

//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(
//       `CREATE TABLE "discipline" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "PK_139512aefbb11a5b2fa92696828" PRIMARY KEY ("id"))`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE "training_parts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "discipline" text NOT NULL, "distance" integer NOT NULL, "duration" integer NOT NULL, CONSTRAINT "PK_8994c0257ae4eb449ea22285cbe" PRIMARY KEY ("id"))`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE "training_part" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "discipline" text NOT NULL, "distance" integer NOT NULL, "duration" integer NOT NULL, "trainingId" uuid, CONSTRAINT "PK_10c44598a21065d981874ec420a" PRIMARY KEY ("id"))`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE "training" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" text NOT NULL, "date" date NOT NULL, "notes" text NOT NULL DEFAULT '', CONSTRAINT "PK_c436c96be3adf1aa439ef471427" PRIMARY KEY ("id"))`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "training_part" ADD CONSTRAINT "FK_74fbefaf707103bc263302968ab" FOREIGN KEY ("trainingId") REFERENCES "training"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(
//       `ALTER TABLE "training_part" DROP CONSTRAINT "FK_74fbefaf707103bc263302968ab"`,
//     );
//     await queryRunner.query(`DROP TABLE "training"`);
//     await queryRunner.query(`DROP TABLE "training_part"`);
//     await queryRunner.query(`DROP TABLE "training_parts"`);
//     await queryRunner.query(`DROP TABLE "discipline"`);
//   }
// }
