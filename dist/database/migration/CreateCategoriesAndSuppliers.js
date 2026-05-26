"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoriesAndSuppliers1711000001000 = void 0;
class CreateCategoriesAndSuppliers1711000001000 {
    constructor() {
        this.name = "CreateCategoriesAndSuppliers1711000001000";
    }
    async up(queryRunner) {
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
    async down(queryRunner) {
        await queryRunner.query("DROP TABLE suppliers");
        await queryRunner.query("DROP TABLE categories");
    }
}
exports.CreateCategoriesAndSuppliers1711000001000 = CreateCategoriesAndSuppliers1711000001000;
