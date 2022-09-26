import { IOrder } from './IOder.model';
import { IProduct } from '../../../products/domain/models/IProduct.model';

export interface IOrderProducts {
  id: string;
  order: IOrder;
  product: IProduct;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
