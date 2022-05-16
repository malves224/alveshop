/* eslint-disable max-lines-per-function */
import sequelize from 'sequelize';
import Wallet from '../database/models/wallet';
import { IWallet } from '../interfaces/wallet';
import { ServiceWallet } from '../interfaces/services';
import { IProductSale } from '../interfaces/product';
import ProductService from './ProductService';
import Products from '../database/models/products';

class WalletService implements ServiceWallet<IWallet, Wallet> {
  constructor(
    public model = Wallet,
    private productService = new ProductService(),
  ) {}

  async checkIfWalletExist(userId: string | number) {
    const wallet = await this.model.findOne({ where: { user_id: userId } });
    if (!wallet) {
      throw new Error('Não existe um usuario com essa carteira.');
    } 
  }

  async purchase({ idProduct, quantity }: 
  IProductSale, userId: string | number) {
    const product = await this.productService
      .checkIfProductIsActive(idProduct, { isReturn: true }) as Products;
    const totalSale = product.price * (quantity as number);
    const { coins } = await this.findOne(userId);
    if (coins < totalSale) {
      throw new Error('Saldo insuficiente.');
    }
    try {
      await this.decrementCoins(userId, totalSale);
      return { 
        message: 'Transação Efetuada com sucesso.', 
        newBalance: coins - totalSale, 
      };
    } catch (error) {
      throw new Error('Erro interno ao efetuar a transação');
    }
  }

  async update(userId: string | number, obj: IWallet) {
    await this.checkIfWalletExist(userId);
    return this.model.update(obj, { where: { user_id: userId } });
  }

  async incrementCoins(userId: string | number, coin: string | number) {
    return this.model.update(
      { coins: sequelize.literal(`coins + ${coin}`) },
      { where: { userId } },
    );
  }

  decrementCoins(userId: string | number, coin: string | number) {
    return this.model.update(
      { coins: sequelize.literal(`coins - ${coin}`) },
      { where: { user_id: userId } },
    );
  }

  async findOne(userId: string | number): Promise<Wallet> {
    const wallet = await this.model.findOne({ where: { user_id: userId } });
    if (!wallet) {
      throw new Error('Carteria do usuario não encontrado.');
    }
    return wallet; 
  }

  findAll(): Promise<Wallet[]> {
    return this.model.findAll();
  }
}

export default WalletService;
