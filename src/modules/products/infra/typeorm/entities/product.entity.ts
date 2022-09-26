import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import OrdersProducts from './product.entity';

@Entity('products')
export default class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(
    () => OrdersProducts,
    (product_orders) => product_orders.product_orders
  )
  product_orders: OrdersProducts[];

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
