export class CreateUsersTable1711000000002 {
    constructor() {
        this.name = 'CreateUsersTable1711000000002';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE users (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        role_id BIGINT NOT NULL,
        full_name VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NULL,
        status BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_users_roles FOREIGN KEY (role_id) REFERENCES roles(id)
      )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE users`);
    }
}
