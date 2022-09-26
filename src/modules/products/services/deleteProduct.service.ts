import AppError from '../../../shared/errors/app.errors';
import { getCustomRepository } from 'typeorm';
import ProductRepository from '../typeorm/repositories/product.repository';
import RedisCache from 'shared/cache/redisCache';

interface IRequest {
  id: string;
}

export default class deleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.remove(product);
  }
}
