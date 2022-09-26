import { ICustomer } from '../../../customers/domain/models/ICustomer.model';
import { ICreateOrderProducts } from './ICreateOrderProducts.model';

export interface ICreateOrder {
  customer: ICustomer;
  products: ICreateOrderProducts;
}
