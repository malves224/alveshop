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
}

export default UserController;