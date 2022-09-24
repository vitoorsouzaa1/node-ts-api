import AppError from '../../../shared/errors/app.errors';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/order.entity';
import OrdersRepository from '../typeorm/repositories/oders.repository';

interface IRequest {
  id: string;
}

export default class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    return order;
  }
}
