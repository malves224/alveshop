import { NextFunction, Request, Response } from 'express';
import Jwt from '../auth/Jwt';

class AuthorizationController {
  constructor(private jwt = new Jwt()) {}

  requireAuth = async (req: Request, res: Response, next: NextFunction) => {
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
}

export default AuthorizationController;