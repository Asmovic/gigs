import express from 'express';
import morgan from 'morgan';
import logger from './helpers/logger';

// Create global app object
const app = express();

const isProduction = process.env.NODE_ENV === 'production';

// Log requests to the console.
app.use(morgan('dev'));

logger.config();

app.use(morgan(':remote-addr - ":method :url :status ":user-agent"', {
  stream: logger.stream(),
  skip: () => !isProduction,
}));

app.get('/', (req, res) => res.send("Welcome. Let's create a Gig"));
app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: '404 Page Not Found',
  });
});

export default app;
