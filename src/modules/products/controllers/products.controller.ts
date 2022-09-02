import { Request, Response } from 'express';
import createProductService from '../services/createProduct.service';
import deleteProductService from '../services/deleteProduct.service';
import listProductService from '../services/listProduct.service';
import showProductService from '../services/showProduct.service';
import updateProductService from '../services/updateProduct.service';

export class productController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listProducts = new listProductService();

    const products = await listProducts.execute();

    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showProducts = new showProductService();

    const product = await showProducts.execute({ id });

    return res.json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;

    const createProduct = new createProductService();

    const product = await createProduct.execute({ name, price, quantity });

    return res.json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const { id } = req.params;

    const updateProduct = new updateProductService();

    const product = await updateProduct.execute({ id, name, price, quantity });

    return res.json(product);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteProduct = new deleteProductService();
    await deleteProduct.execute({ id });

    return res.json([]);
  }
}
