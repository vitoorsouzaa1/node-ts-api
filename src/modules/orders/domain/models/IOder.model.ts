import { ICustomer } from '../../../customers/domain/models/ICustomer.model';
import { ICreateOrderProducts } from './ICreateOrderProducts.model';

export interface IOrder {
  id: string;
  order?: number;
  product_orders: ICreateOrderProducts[];
  customer: ICustomer;
  created_at: Date;
  updated_at: Date;
}
