import AppError from '../../../shared/errors/app.errors';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/order.entity';
import OrdersRepository from '../typeorm/repositories/oders.repository';
import CustomersRepository from '../../customers/typeorm/repositories/customers.repository';
import ProductRepository from '../../products/typeorm/repositories/product.repository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export default class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customerRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customerRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with this ID!', 404);
    }

    const productExists = await productsRepository.findAllByIds(products);

    if (!productExists.length) {
      throw new AppError('Could not find any products with this IDs!', 404);
    }

    const idExists = productExists.map((product) => product.id);

    const inexsitentsProducts = products.filter(
      (product) => !idExists.includes(product.id)
    );

    if (inexsitentsProducts.length) {
      throw new AppError(
        `Could not find product ${inexsitentsProducts[0].id}.`,
        404
      );
    }

    const quantityAvailable = products.filter(
      (product) =>
        productExists.filter((p) => p.id === product.id)[0].quantity <
        product.quantity
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} if not available for ${quantityAvailable[0].id}.`,
        400
      );
    }

    const serializedProducts = products.map((product) => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productExists.filter((p) => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { product_orders } = order;

    const updatedProductQuantity = product_orders.map((product) => ({
      id: product.product_id,
      quantity:
        productExists.filter((p) => p.id === product.id)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}
