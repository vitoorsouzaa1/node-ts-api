import { IProduct } from '../../../products/domain/models/IProduct.model';

export interface IRequestCreateOrder {
  customer_id: string;
  products: IProduct[];
}
