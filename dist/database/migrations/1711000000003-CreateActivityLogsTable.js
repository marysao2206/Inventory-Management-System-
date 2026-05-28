export class CreateActivityLogsTable1711000000003 {
    constructor() {
        this.name = 'CreateActivityLogsTable1711000000003';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE activity_logs (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        user_id BIGINT NOT NULL,
        activity VARCHAR(255) NOT NULL,
        ip_address VARCHAR(50) NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_activity_logs_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE activity_logs`);
    }
}
