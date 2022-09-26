import { IProduct } from '../models/IProduct.model';
import { IFindProducts } from '../models/IFindProducts.model';
import { ICreateProduct } from '../models/ICreateProduct.model';
import { IUpdateStockProduct } from '../models/IUpdateSotck.model';
import { IProductPaginate } from '../models/IProductPaginate.model';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IProductRepository {
  findByName(name: string): Promise<IProduct | null>;
  findById(id: string): Promise<IProduct | null>;
  findAll({ page, skip, take }: SearchParams): Promise<IProductPaginate>;
  findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  updateStock(products: IUpdateStockProduct[]): Promise<void>;
  remove(product: IProduct): Promise<void>;
}
