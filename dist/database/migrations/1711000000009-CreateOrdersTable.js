export class CreateOrdersTable1711000000009 {
    constructor() {
        this.name = 'CreateOrdersTable1711000000009';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE orders (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        user_id BIGINT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        status VARCHAR(30) DEFAULT 'PENDING',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE orders`);
    }
}
