import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column()
  "product_name": string;

  @Column()
  "product_price": number;

  @Column()
  "product_SKU": number;

  @Column("json", { nullable: true })
  "product_images": Record<string, any>[];
}
