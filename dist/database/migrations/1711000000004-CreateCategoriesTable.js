export class CreateCategoriesTable1711000000004 {
    constructor() {
        this.name = 'CreateCategoriesTable1711000000004';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE categories (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(150) NOT NULL UNIQUE,
        description TEXT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE categories`);
    }
}
