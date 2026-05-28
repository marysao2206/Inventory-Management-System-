import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "suppliers" })
export class Supplier {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id!: string;

  @Column({ type: "varchar", length: 150 })
  name!: string;

  @Column({ name: "contact_person", type: "varchar", length: 150, nullable: true })
  contactPerson!: string | null;

  @Column({ type: "varchar", length: 150, nullable: true })
  email!: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone!: string | null;

  @Column({ type: "text", nullable: true })
  address!: string | null;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;
}
