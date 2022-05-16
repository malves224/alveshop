import { Router } from 'express';
import AuthorizationController from '../controllers/AuthorizationController';
import ProductController from '../controllers/ProductController';

const productController = new ProductController('/product');
const authorizationController = new AuthorizationController();

const { route, validationsSchema } = productController;
const routeId = `${route}/:id`;
const productRouter = Router();

productRouter
  .get(routeId, (req, res) => productController.findOne(req, res))
  .get(route, (req, res) => productController.findAll(req, res));

productRouter.delete(
  routeId, 
  authorizationController.checkUserToken,
  AuthorizationController.checkIfUserAdmin,
  (req, res) => productController.delete(req, res),
);

productRouter
  .put(
    routeId,
    validationsSchema,
    authorizationController.checkUserToken,
    AuthorizationController.checkIfUserAdmin,
    (req, res) => productController.update(req, res),
  )
  .post(
    route, 
    validationsSchema,
    authorizationController.checkUserToken,
    AuthorizationController.checkIfUserAdmin,
    (req, res) => productController.create(req, res),
  );

export default productRouter;
