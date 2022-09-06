import AppError from 'src/shared/errors/app.errors';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/product.repository';

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

    await productsRepository.remove(product);
  }
}
