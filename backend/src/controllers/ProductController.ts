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
}

export default ProductController;