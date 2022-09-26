import { IOrderProducts } from '../../../orders/domain/models/IOrderProducts.model';

export interface IProduct {
  id: string;
  order_products?: IOrderProducts[];
  name: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
