import {MigrationInterface, QueryRunner} from "typeorm";

export class generateAllMigrations1617186761853 implements MigrationInterface {
    name = 'generateAllMigrations1617186761853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `orderline` (`id` int NOT NULL AUTO_INCREMENT, `productId` int NOT NULL, `quantity` int NOT NULL, `orderId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `level` int NOT NULL DEFAULT '1', `deletedAt` datetime(6) NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `order` (`id` int NOT NULL AUTO_INCREMENT, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `product` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `brand` varchar(255) NOT NULL, `category` int NOT NULL, `price` int NOT NULL, `photo` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `seller` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `orderline` ADD CONSTRAINT `FK_cf4e63a17005c1e577c0fd6edf0` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `order` ADD CONSTRAINT `FK_caabe91507b3379c7ba73637b84` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `order` DROP FOREIGN KEY `FK_caabe91507b3379c7ba73637b84`");
        await queryRunner.query("ALTER TABLE `orderline` DROP FOREIGN KEY `FK_cf4e63a17005c1e577c0fd6edf0`");
        await queryRunner.query("DROP TABLE `product`");
        await queryRunner.query("DROP TABLE `order`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `orderline`");
    }

}
