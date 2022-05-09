import User from '../database/models/users';
import { IUser } from '../interfaces/user';
import { ServiceComplete } from '../interfaces/services';
import Wallet from '../database/models/wallet';
import CryptographicModule from '../auth/CryptographicModule';

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

  async create({ name, email, password }: IUser): Promise<User> {
    await this.checkIfUserExist(email);
    const hashPassword = await this.cryptographicModule.generateHash(password);
    const objCreate = {
      name,
      email,
      password: hashPassword,
      role: 'client',
      wallet: {
        coins: 0.00,
      },
    };
    return this.model.create(
      objCreate,
      { include: { model: this.modelAssociate, as: 'wallet' } },
    );
  }

  update(id: string | number, obj: IUser): Promise<User> {
    throw new Error('Method not implemented.');
  }

  delete(id: string | number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findOne(id: string | number): Promise<User> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
}

new UserService()
  .create({ name: 'testes', email: 'teastae', password: '123456', role: '' })
  .then((res) => console.log(res));