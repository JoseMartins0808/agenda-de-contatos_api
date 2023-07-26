import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1690294586155 implements MigrationInterface {
    name = 'CreateTables1690294586155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact_email" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "contactId" uuid, CONSTRAINT "UQ_676969f2c372742adce52683a5f" UNIQUE ("email"), CONSTRAINT "PK_7975ba85f06c64e78ab381f3bc2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact_phone" ("id" SERIAL NOT NULL, "phone" character varying(11) NOT NULL, "contactId" uuid, CONSTRAINT "PK_b46365ba51856971e8f0bcd1493" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying(120) NOT NULL, "registerDate" date NOT NULL, CONSTRAINT "UQ_43ad4cb7f6a1d67a5dd9dd24bf9" UNIQUE ("full_name"), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_email" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "userId" uuid, CONSTRAINT "UQ_f2bff75d7c18f08db06f81934b6" UNIQUE ("email"), CONSTRAINT "PK_95c07c16136adcfdcb8221c1fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_phone" ("id" SERIAL NOT NULL, "phone" character varying(11) NOT NULL, "userId" uuid, CONSTRAINT "PK_8b544a5b4edf9ab1e479c5466f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying(120) NOT NULL, "username" character varying(60) NOT NULL, "password" character varying(120) NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "registerDate" date NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contact_email" ADD CONSTRAINT "FK_dbd56616244d9d229bac6633acf" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact_phone" ADD CONSTRAINT "FK_34a6df60292c7e7c6cb42bd85f0" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_email" ADD CONSTRAINT "FK_9ada349d19d368d20fbf613eef9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_phone" ADD CONSTRAINT "FK_1a921efc6d5620e9018fd304825" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_phone" DROP CONSTRAINT "FK_1a921efc6d5620e9018fd304825"`);
        await queryRunner.query(`ALTER TABLE "user_email" DROP CONSTRAINT "FK_9ada349d19d368d20fbf613eef9"`);
        await queryRunner.query(`ALTER TABLE "contact_phone" DROP CONSTRAINT "FK_34a6df60292c7e7c6cb42bd85f0"`);
        await queryRunner.query(`ALTER TABLE "contact_email" DROP CONSTRAINT "FK_dbd56616244d9d229bac6633acf"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_phone"`);
        await queryRunner.query(`DROP TABLE "user_email"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "contact_phone"`);
        await queryRunner.query(`DROP TABLE "contact_email"`);
    }

}
