import { Router } from 'express';
import AuthorizationController from '../controllers/AuthorizationController';
import UserController from '../controllers/UserController';

const userController = new UserController('/user');
const authorizationController = new AuthorizationController();

const { route } = userController;
const routeId = `${route}/:id`;
const userRouter = Router();

userRouter.post(`${route}/login`, (req, res) => userController.login(req, res));

userRouter.use([authorizationController.checkUserToken]);

userRouter.get(route, (req, res) => userController.findAll(req, res))
  .get(routeId, (req, res) => userController.findOne(req, res))
  .post(route, (req, res) => userController.create(req, res))
  .put(
    routeId, 
    AuthorizationController.checkIfUserIsAdmin,
    (req, res) => userController.update(req, res),
  )
  .delete(
    routeId, 
    AuthorizationController.checkIfUserIsAdmin,
    (req, res) => userController.delete(req, res),
  );

export default userRouter;
