export class CreateSuppliersTable1711000000005 {
    constructor() {
        this.name = 'CreateSuppliersTable1711000000005';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE suppliers (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(150) NOT NULL,
        contact_person VARCHAR(150) NULL,
        email VARCHAR(150) NULL,
        phone VARCHAR(20) NULL,
        address TEXT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE suppliers`);
    }
}
