import { Repository } from 'typeorm';
import Order from '../entities/order.entity';
import { IOrderRepository } from '../../../../orders/domain/repositories/IOrder.repository';
import { IOrderPaginate } from '../../../../orders/domain/models/IOrderPaginate.model';
import { dataSource } from '../../../../../shared/infra/typeorm/connection.orm';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};
export default class OrdersRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Order);
  }

  public async findById(id: string): Promise<Order | null> {
    const order = this.ormRepository.findOne({
      where: { id },
      relations: ['order_products', 'customer'],
    });
    return order;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IOrderPaginate> {
    const [orders, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: orders,
    };

    return result;
  }

  public async create({ customer, products }): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      product_orders: products,
    });

    await this.ormRepository.save(order);

    return order;
  }
}
