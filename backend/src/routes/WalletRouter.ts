import { Router } from 'express';
import AuthorizationController from '../controllers/AuthorizationController';
import WalletController from '../controllers/WalletController';

const walletController = new WalletController('/wallet');
const authorizationController = new AuthorizationController();
const { route, validationsSchema } = walletController;
const routeId = `${route}/:id`;
const walletRouter = Router();

walletRouter
  .get(
    routeId,
    authorizationController.checkUserToken,
    AuthorizationController.checkAuthorshipObject,  
    (req, res) => walletController.findOne(req, res),
  )
  .get(
    route, 
    authorizationController.checkUserToken,
    AuthorizationController.checkIfUserAdmin,
    (req, res) => walletController.findAll(req, res),
  )
  .put(
    routeId,
    validationsSchema,
    authorizationController.checkUserToken,
    AuthorizationController.checkIfUserAdmin,
    (req, res) => walletController.update(req, res),
  );

export default walletRouter;