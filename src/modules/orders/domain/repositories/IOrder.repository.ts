import { ICreateOrder } from '../models/ICreateOrder.model';
import { IOrder } from '../models/IOder.model';
import { IOrderPaginate } from '../../../orders/domain/models/IOrderPaginate.model';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IOrderRepository {
  findById(id: string): Promise<IOrder | null>;
  findAll({ page, skip, take }: SearchParams): Promise<IOrderPaginate>;
  createOrder(data: ICreateOrder): Promise<IOrder>;
}
