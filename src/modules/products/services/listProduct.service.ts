import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProduct.repository';
import { IProductPaginate } from '../domain/models/IProductPaginate.model';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
export default class listProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductRepository
  ) {}

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<IProductPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const products = await this.productsRepository.findAll({
      page,
      skip,
      take,
    });

    return products;
  }
}
