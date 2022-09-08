import AppError from '@shared/errors/app.errors';
import { getCustomRepository } from 'typeorm';
import { Product } from '../typeorm/entities/product.entity';
import { ProductRepository } from '../typeorm/repositories/product.repository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export default class createProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('This product already exists', 500);
    }
    const product = productsRepository.create({ name, price, quantity });

    await productsRepository.save(product);

    return product;
  }
}
