import {MigrationInterface, QueryRunner} from "typeorm";

export class addLevelToUser1614246769488 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        `ALTER TABLE 'user' ADD COLUMN 'level' AFTER 'password'`
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        `ALTER TABLE 'user' DROP COLUMN 'level'`
    }
}
