import { MigrationInterface, QueryRunner } from "typeorm";

export class FixProcessedAtType1738162606090 implements MigrationInterface {
    name = 'FixProcessedAtType1738162606090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "customer"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "customerName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "customerEmail" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('Pendente', 'Processado')`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "status" "public"."orders_status_enum" NOT NULL DEFAULT 'Pendente'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "status" character varying NOT NULL DEFAULT 'Pendente'`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "price" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "customerEmail"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "customerName"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "customer" character varying NOT NULL`);
    }

}
