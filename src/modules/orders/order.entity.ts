import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ name: "user_id", type: "bigint", nullable: true })
  userId?: string | null;

  @Column({ name: "total_amount", type: "decimal", precision: 10, scale: 2 })
  totalAmount!: string;

  @Column({ type: "varchar", length: 30, default: "PENDING" })
  status!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt!: Date;
}