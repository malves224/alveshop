import { Request, Response } from 'express';
import Products from '../database/models/products';
import { IProduct } from '../interfaces/product';
import ProductSchema from '../schemas/SchemaProduct';
import ProductService from '../services/ProductService';
import GenericController from './GenericController';

class ProductController extends GenericController<IProduct, Products> {
  constructor(
    route: string,
    service = new ProductService(),
    schema = new ProductSchema().schema,
  ) {
    super(route, service, schema);
  }

  async findAll(req: Request, res: Response) {
    const { 
      name, 
      priceGreaterThan, 
      priceLessThan, 
      active } = req.query as { [x: string]: string };
      
    const list = await this.service
      .findAll({ 
        name, 
        priceGreaterThan, 
        priceLessThan,
        active,
      });
    return res.status(200).json(list);
  }
}

export default ProductController;