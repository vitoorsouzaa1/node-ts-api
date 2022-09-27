import { container } from 'tsyringe';

import { ICustomersRepository } from '../../modules/customers/domain/repositories/ICustomers.repository';
import CustomersRepository from '../../modules/customers/infra/typeorm/repositories/customers.repository';
import OrdersRepository from '../../modules/orders/infra/typeorm/repositories/oders.repository';
import { IOrderRepository } from '../../modules/orders/domain/repositories/IOrder.repository';
import { IProductRepository } from '../../modules/products/domain/repositories/IProduct.repository';
import ProductsRepository from '../../modules/products/infra/typeorm/repositories/product.repository';
import { IUsersRepository } from '../../modules/users/domain/repositories/IUser.repository';
import { IUserTokensRepository } from '../../modules/users/domain/repositories/IUserToken.repository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/users.repository';
import UserTokensRepository from '../../modules/users/infra/typeorm/repositories/userTokens.repository';

import '@modules/users/providers/HashProvider/index.provider';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository
);
container.registerSingleton<IProductRepository>(
  'ProductsRepository',
  ProductsRepository
);
container.registerSingleton<IOrderRepository>(
  'OrdersRepository',
  OrdersRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
);
