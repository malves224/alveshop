import App from './app';
import productRouter from './routes/ProductRouter';
import userRouter from './routes/UserRouters';

const server = new App();

server.addRouter(userRouter);
server.addRouter(productRouter);

export default server;
