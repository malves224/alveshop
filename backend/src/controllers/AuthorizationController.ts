import { NextFunction, Request, Response } from 'express';
import Jwt from '../auth/Jwt';
import UserService from '../services/UserService';

class AuthorizationController {
  constructor(
    private jwt = new Jwt(),
    private userService = new UserService(),
  ) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await this.userService.authentication(email, password);
      return res.status(200).json(token);
    } catch (error) {
      const { message } = error as Error;
      return res.status(401).json({ message });
    }
  }

  checkUserToken = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }

    try {
      const tokenInfo = await this.jwt.validate(authorization);
      req.body.tokenInfo = tokenInfo;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token invalido ou vencido.' });
    }
  };

  static checkIfUserAdmin = (
    req: Request, 
    res: Response, 
    next: NextFunction,
  ) => {
    const { role } = req.body.tokenInfo;
    if (role !== 'adm') {
      return res.status(401).json({ message: 'Não autorizado.' });
    } 
    next(); 
  };

  static checkAuthorshipObject = (
    req: Request, 
    res: Response, 
    next: NextFunction,
  ) => {
    const { id: idUserAuth, role } = req.body.tokenInfo;
    const { id: idFromRouter } = req.params;
    if (role !== 'adm' && +idFromRouter !== idUserAuth) {
      return res.status(401).json({ message: 'Não autorizado.' });
    } 
    next(); 
  };
}

export default AuthorizationController;