import App from './app';
import userRouter from './routes/UserRouters';

const server = new App();

server.addRouter(userRouter);

export default server;
