import { getCustomRepository } from 'typeorm';
import { Product } from '../typeorm/entities/product.entity';
import { ProductRepository } from '../typeorm/repositories/product.repository';

export default class listProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const products = productsRepository.find();

    return products;
  }
}
