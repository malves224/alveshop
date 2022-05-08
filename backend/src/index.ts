import 'dotenv/config';
import server from './server';

const portServer = process.env.PORT || 3001;

server.startServer(portServer);