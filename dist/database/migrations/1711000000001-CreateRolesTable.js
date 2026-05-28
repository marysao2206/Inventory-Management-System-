export class CreateRolesTable1711000000001 {
    constructor() {
        this.name = 'CreateRolesTable1711000000001';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE roles (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(150) NOT NULL UNIQUE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE roles`);
    }
}
