import sequelize from 'sequelize';
import Wallet from '../database/models/wallet';
import { IWallet } from '../interfaces/wallet';
import { ServiceWallet } from '../interfaces/services';

class WalletService implements ServiceWallet<IWallet, Wallet> {
  constructor(public model = Wallet) {}

  async checkIfWalletExist(userId: string | number) {
    const wallet = await this.model.findOne({ where: { userId } });
    if (!wallet) {
      throw new Error('Não existe um usuario com essa carteira.');
    } 
  }

  async update(userId: string | number, obj: IWallet) {
    await this.checkIfWalletExist(userId);
    return this.model.update(obj, { where: { userId } });
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
      { where: { userId } },
    );
  }

  async findOne(userId: string | number): Promise<Wallet> {
    const wallet = await this.model.findOne({ where: { userId } });
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