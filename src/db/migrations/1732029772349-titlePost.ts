import { MigrationInterface, QueryRunner } from "typeorm";

export class TitlePost1732029772349 implements MigrationInterface {
    name = 'TitlePost1732029772349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "title_post" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "title_post"`);
    }

}
