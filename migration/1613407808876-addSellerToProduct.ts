import {MigrationInterface, QueryRunner} from "typeorm";

export class addSellerToProduct1613407808876 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        `ALTER TABLE "product" ADD COLUMN "seller" after "brand"`
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        `ALTER TABLE "product" DELETE COLUMN "seller"`
    }
}
