import { Request, Response } from 'express';
import { container } from 'tsyringe';
import createProductService from '../../../services/createProduct.service';
import deleteProductService from '../../../services/deleteProduct.service';
import listProductService from '../../../services/listProduct.service';
import showProductService from '../../../services/showProduct.service';
import updateProductService from '../../../services/updateProduct.service';

export default class productController {
  public async index(req: Request, res: Response): Promise<Response> {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;

    const listProducts = container.resolve(listProductService);

    const products = await listProducts.execute({ page, limit });

    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showProducts = container.resolve(showProductService);

    const product = await showProducts.execute({ id });

    return res.json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;

    const createProduct = container.resolve(createProductService);

    const product = await createProduct.execute({ name, price, quantity });

    return res.json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const { id } = req.params;

    const updateProduct = container.resolve(updateProductService);

    const product = await updateProduct.execute({ id, name, price, quantity });

    return res.json(product);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteProduct = container.resolve(deleteProductService);
    await deleteProduct.execute({ id });

    return res.json([]);
  }
}
