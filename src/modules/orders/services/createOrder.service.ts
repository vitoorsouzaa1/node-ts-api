import AppError from '../../../shared/errors/app.errors';
import { inject, injectable } from 'tsyringe';
import { IOrderRepository } from '../domain/repositories/IOrder.repository';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomers.repository';
import { IProductRepository } from '@modules/products/domain/repositories/IProduct.repository';
import { IRequestCreateOrder } from '../domain/models/IRequestCreateOrder.model';
import { IOrder } from '../domain/models/IOder.model';
@injectable()
export default class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrderRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductRepository
  ) {}

  public async execute({
    customer_id,
    products,
  }: IRequestCreateOrder): Promise<IOrder> {
    const customerExists = await this.customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with this ID!', 404);
    }

    const productExists = await this.productsRepository.findAllByIds(products);

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

    const order = await this.ordersRepository.create({
      customer: customerExists,
      products: serializedProducts,
    });

    const { product_orders } = order;

    const updatedProductQuantity = product_orders.map((product) => ({
      id: product.product_id,
      quantity:
        productExists.filter((p) => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await this.productsRepository.updateStock(updatedProductQuantity);

    return order;
  }
}
