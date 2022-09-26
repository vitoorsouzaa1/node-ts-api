import { DataSource } from 'typeorm';

import User from 'modules/users/typeorm/entities/user.entity';
import UserToken from 'modules/users/typeorm/entities/userToken.entity';
import Customer from 'modules/customers/typeorm/entities/customer.entity';
import Order from 'modules/orders/typeorm/entities/order.entity';
import Product from 'modules/products/typeorm/entities/product.entity';
import OrdersProducts from 'modules/orders/typeorm/entities/ordersProducts.entity';

import { CreateCustomers1663707815925 } from './migrations/1663707815925-CreateCustomers';
import { CreateOrders1663806253210 } from './migrations/1663806253210-CreateOrders';
import { CreateOrdersProduct1663807275024 } from './migrations/1663807275024-CreateOrdersProduct';
import { AddCustomerIdToOrders1663806759682 } from './migrations/1663806759682-AddCustomerIdToOrders';
import { AddOrderIdToOrdersProducts1663807563701 } from './migrations/1663807563701-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1663807859212 } from './migrations/1663807859212-AddProductIdToOrdersProducts';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'apivendas',
  entities: [User, UserToken, Customer, Order, Product, OrdersProducts],
  migrations: [
    CreateCustomers1663707815925,
    CreateOrders1663806253210,
    CreateOrdersProduct1663807275024,
    AddProductIdToOrdersProducts1663807859212,
    AddOrderIdToOrdersProducts1663807563701,
    AddCustomerIdToOrders1663806759682,
  ],
});
