import { IOrder } from './IOder.model';

export interface IOrderPaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: IOrder[];
}
