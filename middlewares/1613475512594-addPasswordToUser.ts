import {MigrationInterface, QueryRunner} from "typeorm";

export class addPasswordToUser1613475512594 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        `ALTER TABLE 'user' ADD COLUMN 'password' AFTER 'email'`
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        `ALTER TABLE 'user' DROP COLUMN 'password'`
    }

}
