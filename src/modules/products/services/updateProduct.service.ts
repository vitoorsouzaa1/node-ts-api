import AppError from '../../../shared/errors/app.errors';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/product.entity';
import ProductRepository from '../typeorm/repositories/product.repository';
import RedisCache from 'shared/cache/redisCache';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class updateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);
    const productExists = await productsRepository.findByName(name);

    if (!product) {
      throw new AppError('Product not found', 404);
    } else if (productExists && name !== product.name) {
      throw new AppError('This product already exists', 300);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.save(product);

    return product;
  }
}
