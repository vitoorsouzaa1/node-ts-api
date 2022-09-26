import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Customer from '../../../../customers/infra/typeorm/entities/customer.entity';
import OrdersProducts from './ordersProducts.entity';
import { IOrder } from '../../../domain/models/IOder.model';

@Entity('orders')
export default class Order implements IOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => OrdersProducts, (product_orders) => product_orders.order, {
    cascade: true,
  })
  product_orders: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
