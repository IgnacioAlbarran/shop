import {MigrationInterface, QueryRunner} from "typeorm";

export class addOrderlinesToOrder1616495528011 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        `ALTER TABLE 'Order' ADD COLUMN 'orderlines' after 'userId'`
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        `ALTER TABLE 'Order' DROP COLUMN 'orderlines'`
    }

}
