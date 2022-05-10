import md5 from 'md5';
import User from '../database/models/users';
import { IUser } from '../interfaces/user';
import { ServiceWithAuth } from '../interfaces/services';
import Wallet from '../database/models/wallet';
import { IDataToken } from '../interfaces/tokenUser';
import Jwt from '../auth/Jwt';

export default class UserService implements ServiceWithAuth<IUser, User> {
  constructor(
    public model = User,
    public modelAssociate = Wallet,
    public jwt = new Jwt(),
  ) {}

  async checkIfUserExist(email: string) {
    const user = await this.model.findOne({ where: { email } });
    if (user) {
      throw new Error('Já existe um cadastro com esse email.');
    } 
  }

  async authentication(email: string, password: string) {
    const user = await this.model
      .findOne({ where: { email, password: md5(password) } });
    if (!user) {
      throw new Error('Email ou senha inválido.');
    }
    const { id, role, email: emailUser } = user;
    const token = this.jwt.generateToken({ id, role, email: emailUser });
    return { token };
  }

  async create({ name, email, password }: IUser) {
    await this.checkIfUserExist(email);
    const objCreate = { active: true,
      name,
      email,
      password: md5(password),
      role: 'customer',
      wallet: {
        coins: 0.00,
      },
    };
    try {
      const userCreated = await this.model.create(objCreate, { 
        include: { model: this.modelAssociate, as: 'wallet' },
      });
      return { idUser: userCreated.id,
        message: 'Usuario criado com sucesso.' };
    } catch (error) { throw new Error('Falha inesperada.'); }
  }

  async updateAdmin(idUser: string | number, user: IUser) {
    const { name, password, email } = user;
    return this.model.update(
      { name, password: md5(password), email },
      { where: { id: idUser } },
    );
  }

  async update(
    idUser: string | number, 
    user: IUser, 
    tokenInfo: IDataToken,
  ) {
    await this.checkIfUserExist(user.email);
    if (tokenInfo.role === 'admin') {
      return this.updateAdmin(idUser, user);
    }
    if (+idUser !== tokenInfo.id) {
      throw new Error('Não autorizado.');
    }
    const { name, password, email } = user;
    return this.model.update(
      { name, password: md5(password), email },
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
    await this.model.update({ active: false }, { where: { id: idUser } });
  }

  async findOne(id: string | number) {
    const user = await this.model.findOne(
      { 
        where: { id },
        attributes: { exclude: ['password'] }, 
      },
    );
    if (!user) {
      throw new Error('Usuario não encontrado.');
    }
    return user;
  }

  findAll(): Promise<User[]> {
    return this.model
      .findAll({ attributes: { exclude: ['password'] } });
  }
}