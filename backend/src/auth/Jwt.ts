import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { IDataToken } from '../interfaces/TokenUser';

const secret = process.env.JWT_SECRET as jwt.Secret;

export default class Jwt {
  constructor(
    public tokenModule = jwt,
    private secretKey = secret,
  ) {}

  async validate(token: string) {
    try {
      const dataToken = this.tokenModule.verify(token, this.secretKey);
      return dataToken;
    } catch (error) {
      if (error instanceof Error) { throw error; }
    }
  }

  async generateToken(data: IDataToken) {
    const token = this.tokenModule.sign(data, this.secretKey, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    return token;
  }
}
