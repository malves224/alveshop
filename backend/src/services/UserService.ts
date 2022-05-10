import User from '../database/models/users';
import { IUser } from '../interfaces/user';
import { ServiceComplete } from '../interfaces/services';
import Wallet from '../database/models/wallet';
import CryptographicModule from '../auth/CryptographicModule';
import { IDataToken } from '../interfaces/TokenUser';

export default class UserService implements ServiceComplete<IUser, User> {
  constructor(
    public model = User,
    public modelAssociate = Wallet,
    public cryptographicModule = new CryptographicModule(),
  ) {}

  async checkIfUserExist(email: string) {
    const user = await this.model.findOne({ where: { email } });
    if (user) {
      throw new Error('Já existe um cadastro com esse email.');
    } 
  }

  async checkIfPasswordValid(password: string, hash: string) {
    const isValid = await this
      .cryptographicModule.checkPasswordHash(password, hash);
    if (!isValid) {
      throw new Error('Senha inválida.');
    }
  }

  async create({ name, email, password }: IUser): Promise<User> {
    await this.checkIfUserExist(email);
    const hashPassword = await this.cryptographicModule.generateHash(password);
    const objCreate = {
      name,
      email,
      password: hashPassword,
      role: 'customer',
      wallet: {
        coins: 0.00,
      },
    };
    return this.model.create(
      objCreate,
      { include: { model: this.modelAssociate, as: 'wallet' } },
    );
  }

  async updateAdmin(idUser: string | number, user: IUser) {
    const { name, password, email } = user;
    return this.model.update(
      { name, password, email },
      { where: { id: idUser } },
    );
  }

  async update(
    idUser: string | number, 
    user: IUser, 
    tokenInfo: IDataToken,
  ) {
    if (tokenInfo.role === 'admin') {
      return this.updateAdmin(idUser, user);
    }
    if (+idUser !== tokenInfo.id) {
      throw new Error('Não autorizado.');
    }
    const { name, password, email } = user;
    return this.model.update(
      { name, password, email },
      { where: { id: idUser } },
    );
  }

  async delete(idUser: string | number, tokenInfo: IDataToken): Promise<void> {
    if (tokenInfo.role === 'admin') {
      await this.model.destroy({ where: { id: idUser } });
      return;
    }
    if (+idUser !== tokenInfo.id) {
      throw new Error('Não autorizado.');
    }
    await this.model.update({ status: false }, { where: { id: idUser } });
  }

  findOne(id: string | number): Promise<User> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
}