import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export type InventoryStatus = "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" | "RESERVED";

@Entity("inventory_items")
export class InventoryItem {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ name: "product_id", type: "bigint", nullable: true })
  productId?: string | null;

  @Column({ name: "warehouse_location", type: "varchar", length: 150, nullable: true })
  warehouseLocation?: string | null;

  @Column({ type: "int", nullable: true })
  quantity?: number | null;

  @Column({ type: "enum", enum: ["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK", "RESERVED"], nullable: true })
  status?: InventoryStatus | null;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt!: Date;
}

@Entity("inventory_logs")
export class InventoryLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "inventory_item_id", type: "bigint", nullable: true })
  inventoryItemId?: string | null;

  @Column({ name: "action_type", type: "varchar", length: 50, nullable: true })
  actionType?: string | null;

  @Column({ type: "int", nullable: true })
  quantity?: number | null;

  @Column({ type: "text", nullable: true })
  note?: string | null;

  @Column({ name: "created_by", type: "bigint", nullable: true })
  createdBy?: string | null;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;
}

@Entity("inventory_details")
export class InventoryDetail {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ name: "inventory_item_id", type: "bigint", nullable: true })
  inventoryItemId?: string | null;

  @Column({ name: "product_id", type: "bigint", nullable: true })
  productId?: string | null;

  @Column({ name: "user_id", type: "bigint", nullable: true })
  userId?: string | null;
}

@Entity("stocks")
export class Stock {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id!: string;

  @Column({ name: "detail_id", type: "bigint", nullable: true })
  detailId?: string | null;

  @Column({ name: "supply_id", type: "bigint", nullable: true })
  supplyId?: string | null;

  @Column({ type: "float", nullable: true })
  qty?: number | null;

  @Column({ name: "unit_price", type: "float", nullable: true })
  unitPrice?: number | null;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;

  @Column({ name: "user_id", type: "bigint", nullable: true })
  userId?: string | null;
}
