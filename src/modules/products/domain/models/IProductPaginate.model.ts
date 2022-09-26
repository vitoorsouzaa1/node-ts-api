import { IProduct } from './IProduct.model';

export interface IProductPaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: IProduct[];
}
