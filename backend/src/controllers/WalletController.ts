import { NextFunction, Request, Response } from 'express';
import WalletSchema from '../schemas/SchemaWallet';
import WalletService from '../services/WalletService';

class WalletController {
  constructor(
    private service = new WalletService(),
    public schema = new WalletSchema().schema,
  ) {}

  validationsSchema = (req: Request, res: Response, next: NextFunction) => {
    const { error } = this.schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error?.details[0].message });
    }
    return next();
  };

  async purchase(req: Request, res: Response) {
    try {
      const { idProduct, quantity, tokenInfo: { id: userId } } = req.body;
      const response = await this
        .service.purchase({ idProduct, quantity }, userId);
      return res.status(201).json(response);
    } catch (error) {
      const { message } = error as Error;
      return res.status(401).json({ message });
    }
  }

  async findAll(_req: Request, res: Response) {
    const list = await this.service.findAll();
    return res.status(200).json(list);
  }

  async findOne(req: Request, res: Response) {
    try {
      const obj = await this.service.findOne(req.params.id);
      return res.status(200).json(obj);
    } catch (error) {
      const { message } = error as Error;
      return res.status(404).json({ message }); 
    }
  }

  async update(req: Request, res: Response) {
    try {
      await this.service.update(req.params.id, req.body);
      return res.status(200).json({ message: 'Atualizado com sucesso.' });
    } catch (error) {
      const { message } = error as Error;
      return res.status(401).json({ message });
    }
  }
}

export default WalletController;