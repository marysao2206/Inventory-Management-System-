import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { InventoryItem } from "../inventory/inventory.entity";

@Entity({ name: "inventory_logs" })
export class InventoryLog {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id!: string;

  @Column({ name: "inventory_item_id", type: "bigint" })
  inventoryItemId!: string;

  @Column({ name: "action_type", type: "varchar", length: 50 })
  actionType!: string;

  @Column({ type: "int" })
  quantity!: number;

  @Column({ type: "text", nullable: true })
  note!: string | null;

  @Column({ name: "created_by", type: "bigint" })
  createdBy!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;

  @ManyToOne(() => InventoryItem, (inventoryItem) => inventoryItem.logs, { onDelete: "CASCADE" })
  @JoinColumn({ name: "inventory_item_id" })
  inventoryItem!: InventoryItem;
}
