import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/product.entity';
import ProductRepository from '../typeorm/repositories/product.repository';
import redisCache from '../../../shared/cache/redisCache';

export default class listProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    let products = await redisCache.recover<Product[]>(
      'api-vendas-PRODUCT-LIST'
    );

    if (!products) {
      products = await productsRepository.find();

      await redisCache.save('api-vendas-PRODUCT-LIST', products);
    }

    return products;
  }
}
