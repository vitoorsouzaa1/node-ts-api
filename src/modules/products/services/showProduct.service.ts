import AppError from '../../../shared/errors/app.errors';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProduct.repository';
import { IShowProduct } from '../domain/models/IShowProduct.model';
import { IProduct } from '../domain/models/IProduct.model';

@injectable()
export default class showProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository
  ) {}

  public async execute({ id }: IShowProduct): Promise<IProduct> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    return product;
  }
}
