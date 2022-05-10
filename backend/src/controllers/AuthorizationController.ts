import { NextFunction, Request, Response } from 'express';
import Jwt from '../auth/Jwt';

class AuthorizationController {
  constructor(private jwt = new Jwt()) {}

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

  static checkIfUserIsAdmin = async (
    req: Request, 
    res: Response, 
    next: NextFunction,
  ) => {
    const { id: idUserAuth, role } = req.body.tokenInfo;
    const { id: idFromRouter } = req.params;
    if (role !== 'admin' && +idFromRouter !== idUserAuth) {
      return res.status(401).json({ message: 'Não autorizado.' });
    }
    next();
  };
}

export default AuthorizationController;