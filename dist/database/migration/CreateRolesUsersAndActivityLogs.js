export class CreateRolesUsersAndActivityLogs1711000000000 {
    constructor() {
        this.name = "CreateRolesUsersAndActivityLogs1711000000000";
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE roles (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(150) NOT NULL UNIQUE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
        await queryRunner.query(`
      CREATE TABLE users (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        role_id BIGINT NULL,
        full_name VARCHAR(150) NULL,
        email VARCHAR(150) NULL,
        password VARCHAR(255) NULL,
        phone VARCHAR(20) NULL UNIQUE,
        status BOOLEAN NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_users_roles FOREIGN KEY (role_id) REFERENCES roles(id)
      )
    `);
        await queryRunner.query(`
      CREATE TABLE activity_logs (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        user_id BIGINT NULL,
        activity VARCHAR(255) NULL,
        ip_address VARCHAR(50) NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_activity_logs_users FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query("DROP TABLE activity_logs");
        await queryRunner.query("DROP TABLE users");
        await queryRunner.query("DROP TABLE roles");
    }
}
