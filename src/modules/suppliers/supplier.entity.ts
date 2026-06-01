import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("suppliers")
export class Supplier {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ type: "varchar", length: 150, unique: true })
  name!: string;

  @Column({ name: "contact_name", type: "varchar", length: 150, nullable: true })
  contactName?: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone?: string | null;

  @Column({ type: "varchar", length: 150, nullable: true })
  email?: string | null;

  @Column({ type: "text", nullable: true })
  address?: string | null;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt!: Date;
}
