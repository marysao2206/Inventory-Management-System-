import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import {InventoryStatus,InventoryStatusValue,} from "../../constants/inventory-status.constant";
import { InventoryLog } from "../inventory-logs/inventory-log.entity";
import { Product } from "../products/product.entity";

@Entity("inventory")
export class InventoryItem {
  @PrimaryGeneratedColumn("increment", {
    type: "bigint",
  })
  id!: string;

  @Column({
    name: "product_id",
    type: "bigint",
  })
  productId!: string;

  @Column({
    name: "warehouse_location",
    type: "varchar",
    length: 150,
  })
  warehouseLocation!: string;

  @Column({
    type: "int",
    default: 0,
  })
  quantity!: number;

  @Column({
    type: "enum",
    enum: InventoryStatus,
    default: InventoryStatus.OUT_OF_STOCK,
  })
  status!: InventoryStatusValue;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
  })
  updatedAt!: Date;

  // Relations
  @ManyToOne(
    () => Product,
    (product) => product.inventoryItems,
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({
    name: "product_id",
  })
  product!: Product;

  @OneToMany(
    () => InventoryLog,
    (inventoryLog) => inventoryLog.inventoryItem
  )
  logs!: InventoryLog[];
}
