import AppError from '../../../shared/errors/app.errors';
import { inject, injectable } from 'tsyringe';
import { IOrderRepository } from '../domain/repositories/IOrder.repository';
import { IOrder } from '../domain/models/IOder.model';
import { IShowOrder } from '../domain/models/IShowOrder.model';

@injectable()
export default class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrderRepository
  ) {}

  public async execute({ id }: IShowOrder): Promise<IOrder> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    return order;
  }
}
