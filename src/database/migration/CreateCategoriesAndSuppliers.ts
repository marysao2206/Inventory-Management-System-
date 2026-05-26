import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoriesAndSuppliers1711000001000 implements MigrationInterface {
  name = "CreateCategoriesAndSuppliers1711000001000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE categories (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(150) NULL,
        description TEXT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.query(`
      CREATE TABLE suppliers (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(150) NULL,
        contact_name VARCHAR(150) NULL,
        email VARCHAR(150) NULL UNIQUE,
        phone VARCHAR(20) NULL,
        address TEXT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE suppliers");
    await queryRunner.query("DROP TABLE categories");
  }
}
