import AppError from '../../../shared/errors/app.errors';
import { inject, injectable } from 'tsyringe';
import redisCache from '../../../shared/cache/redisCache';
import { IProductRepository } from '../domain/repositories/IProduct.repository';
import { IDeleteProduct } from '../domain/models/IDeleteProduct.model';

@injectable()
export default class deleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository
  ) {}

  public async execute({ id }: IDeleteProduct): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.remove(product);
  }
}
