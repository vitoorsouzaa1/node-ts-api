import AppError from '../../../shared/errors/app.errors';
import { inject, injectable } from 'tsyringe';
import redisCache from '../../../shared/cache/redisCache';
import { IUpdateProduct } from '../domain/models/IUpdateProduct.model';
import { IProductRepository } from '../domain/repositories/IProduct.repository';
import { IProduct } from '../domain/models/IProduct.model';

@injectable()
export default class updateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository
  ) {}

  public async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<IProduct> {
    const product = await this.productsRepository.findById(id);
    const productExists = await this.productsRepository.findByName(name);

    if (!product) {
      throw new AppError('Product not found', 404);
    } else if (productExists && name !== product.name) {
      throw new AppError('This product already exists', 300);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.save(product);

    return product;
  }
}
