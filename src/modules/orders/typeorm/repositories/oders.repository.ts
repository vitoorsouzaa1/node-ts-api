import { EntityRepository, Repository } from 'typeorm';
import Customer from '../../../customers/typeorm/entities/customer.entity';
import Order from '../entities/order.entity';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

@EntityRepository(Order)
export default class OrdersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.findOne(id, {
      relations: ['product_orders', 'customer'],
    });

    return order;
  }

  public async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({ customer, product_orders: products });

    await this.save(order);

    return order;
  }
}
