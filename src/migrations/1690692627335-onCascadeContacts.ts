import { MigrationInterface, QueryRunner } from "typeorm";

export class OnCascadeContacts1690692627335 implements MigrationInterface {
    name = 'OnCascadeContacts1690692627335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_email" DROP CONSTRAINT "FK_dbd56616244d9d229bac6633acf"`);
        await queryRunner.query(`ALTER TABLE "contact_phone" DROP CONSTRAINT "FK_34a6df60292c7e7c6cb42bd85f0"`);
        await queryRunner.query(`ALTER TABLE "contact_email" ADD CONSTRAINT "FK_dbd56616244d9d229bac6633acf" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact_phone" ADD CONSTRAINT "FK_34a6df60292c7e7c6cb42bd85f0" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_phone" DROP CONSTRAINT "FK_34a6df60292c7e7c6cb42bd85f0"`);
        await queryRunner.query(`ALTER TABLE "contact_email" DROP CONSTRAINT "FK_dbd56616244d9d229bac6633acf"`);
        await queryRunner.query(`ALTER TABLE "contact_phone" ADD CONSTRAINT "FK_34a6df60292c7e7c6cb42bd85f0" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact_email" ADD CONSTRAINT "FK_dbd56616244d9d229bac6633acf" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
