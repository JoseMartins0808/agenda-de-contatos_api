import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeletedAtUser1690426407815 implements MigrationInterface {
    name = 'AddDeletedAtUser1690426407815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
    }

}
