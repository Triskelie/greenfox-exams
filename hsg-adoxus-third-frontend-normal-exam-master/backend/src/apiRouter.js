import express from 'express';
import ordersController from "./orders/ordersController";

const apiRouter = express.Router();

apiRouter.get('/orders/:id', ordersController.getOne);
apiRouter.get('/orders', ordersController.get);
apiRouter.post('/orders', ordersController.create);

export default apiRouter;
