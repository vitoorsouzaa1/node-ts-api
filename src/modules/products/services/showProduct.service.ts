import AppError from '@shared/errors/app.errors';
import { getCustomRepository } from 'typeorm';
import { Product } from '../typeorm/entities/product.entity';
import { ProductRepository } from '../typeorm/repositories/product.repository';

interface IRequest {
  id: string;
}

export default class showProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    return product;
  }
}
