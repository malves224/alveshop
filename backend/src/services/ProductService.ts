import { Op } from 'sequelize';
import { ServiceComplete } from '../interfaces/services';
import Products from '../database/models/products';
import { IProduct } from '../interfaces/product';

class ProductService implements ServiceComplete<IProduct, Products> {
  messageErrorInterno = 'Erro interno.';

  constructor(public model = Products) {}

  async checkIfProductExist(id: string | number) {
    const product = await this.model.findOne({ where: { id } });
    if (!product) {
      throw new Error('Produto não existe.');
    } 
  }

  async create(obj: IProduct) {
    try {
      const productCreate = await this.model.create(obj);
      return { id: productCreate.id, message: 'Produto criado com sucesso.' };
    } catch (error) {
      throw new Error(this.messageErrorInterno);
    }
  }

  async update(id: string | number, obj: IProduct): 
  Promise<[number, Products[]]> {
    await this.checkIfProductExist(id);
    try {
      const { name, urlImage, price } = obj;
      return await this.model
        .update({ name, urlImage, price }, { where: { id } });
    } catch (error) {
      throw new Error(this.messageErrorInterno);
    }
  }

  async delete(id: string | number): Promise<void> {
    await this.checkIfProductExist(id);
    try {
      await this.model.update({ active: false }, { where: { id } });
    } catch (error) {
      throw new Error(this.messageErrorInterno);
    }
  }

  async findOne(id: string | number): Promise<Products> {
    const product = await this.model.findOne({ where: { id } });
    if (!product) {
      throw new Error('Produto não encontrado.');
    }
    return product;
  }

  findAll(objTerm: { [x: string]: string | undefined }): Promise<Products[]> {
    const priceBetween = [
      parseFloat(objTerm.priceLessThan as string),
      parseFloat(objTerm.priceGreaterThan as string),
    ];
    const nameForSearch = !objTerm.name ? '' : objTerm.name;
    const priceWhereSequelize = priceBetween.every((value) => value) && {
      price: { [Op.between]: priceBetween },
    };
    const activeSearch = objTerm.active && {
      active: objTerm.active === 'true',
    };
    return this.model
      .findAll({ 
        where: { name: { [Op.like]: `%${nameForSearch}%` },
          ...activeSearch,
          ...priceWhereSequelize,
        },
      });
  }
}

export default ProductService;