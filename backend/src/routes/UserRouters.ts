import { Router } from 'express';
import AuthorizationController from '../controllers/AuthorizationController';
import UserController from '../controllers/UserController';

const userController = new UserController('/user');
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

userRouter.get(route, (req, res) => userController.findAll(req, res))
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
  );

export default userRouter;
