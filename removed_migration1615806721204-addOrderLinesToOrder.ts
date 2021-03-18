import {MigrationInterface, QueryRunner} from "typeorm";

export class addOrderLinesToOrder1615806721204 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        `ALTER TABLE 'order' ADD COLUMN 'orderLines' after 'user'`
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        `ALTER TABLE 'order' DROP COLUMN 'orderLines'`
    }

}
