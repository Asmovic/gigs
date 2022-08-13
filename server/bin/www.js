// This will be our application entry. We'll setup our server here.
import '@babel/polyfill';
import http from 'http';
import logger from '../helpers/logger';
import app from '..';
import { env } from '../helpers/utils';

const PORT = env('PORT', 3000);

const server = http.createServer(app);
server.listen(PORT, () => logger.log(`Server is running at http://localhost:${PORT}`));
