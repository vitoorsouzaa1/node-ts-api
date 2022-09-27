import AppError from '../../../shared/errors/app.errors';
import { inject, injectable } from 'tsyringe';
import redisCache from '../../../shared/cache/redisCache';
import { IProduct } from '../domain/models/IProduct.model';
import { ICreateProduct } from '../domain/models/ICreateProduct.model';
import { IProductRepository } from '../domain/repositories/IProduct.repository';

@injectable()
export default class createProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository
  ) {}

  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('This product already exists', 500);
    }

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    const product = this.productsRepository.create({ name, price, quantity });

    return product;
  }
}
