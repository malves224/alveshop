import App from './app';
import productRouter from './routes/ProductRouter';
import userRouter from './routes/UserRouters';
import walletRouter from './routes/WalletRouter';

const server = new App();

server.addRouter([
  userRouter,
  productRouter,
  walletRouter,
]);

export default server;
