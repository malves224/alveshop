import { Router } from 'express';
import AuthorizationController from '../controllers/AuthorizationController';
import UserController from '../controllers/UserController';
import WalletController from '../controllers/WalletController';

const userController = new UserController('/user');
const walletController = new WalletController();
const authorizationController = new AuthorizationController();

const { route, validationsSchema } = userController;
const routeId = `${route}/:id`;
const userRouter = Router();

userRouter
  .post(`${route}/login`, (req, res) => authorizationController.login(req, res))
  .post(
    route, 
    validationsSchema,
    (req, res) => userController.create(req, res),
  )
  .put(
    routeId,
    validationsSchema,
    authorizationController.checkUserToken,
    AuthorizationController.checkAuthorshipObject,
    (req, res) => userController.update(req, res),
  );

userRouter
  .get(
    route,
    authorizationController.checkUserToken,
    AuthorizationController.checkIfUserAdmin,
    (req, res) => userController.findAll(req, res),
  )
  .get(
    routeId, 
    authorizationController.checkUserToken,
    (req, res) => userController.findOne(req, res),
  )
  .delete(
    routeId, 
    authorizationController.checkUserToken,
    AuthorizationController.checkAuthorshipObject,
    (req, res) => userController.delete(req, res),
  )
  .post(
    `${route}/sale`,
    authorizationController.checkUserToken,
    (req, res) => walletController.purchase(req, res),
  );

export default userRouter;
