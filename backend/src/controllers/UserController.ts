import { Request, Response } from 'express';
import User from '../database/models/users';
import { IUser } from '../interfaces/user';
import UserSchema from '../schemas/SchemaUser';
import UserService from '../services/UserService';
import GenericController from './GenericController';

class UserController extends GenericController<IUser, User> {
  constructor(
    route: string,
    service = new UserService(),
    schema = new UserSchema().schema,
  ) {
    super(route, service, schema);
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await this.service.authentication(email, password);
      return res.status(200).json(token);
    } catch (error) {
      const { message } = error as Error;
      return res.status(401).json({ message });
    }
  }
}

export default UserController;