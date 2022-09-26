import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomers.repository';
import { ICustomerPaginate } from '../domain/models/ICustomerPaginate.model';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
export default class listCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<ICustomerPaginate> {
    const take = limit;
    const skip = Number(page - 1) * take;
    const customers = await this.customersRepository.findAll({
      page,
      skip,
      take,
    });

    return customers;
  }
}
