import express from 'express';
import bodyParser from 'body-parser';

import feedRoutes from './routes/feed';

import { environment } from './environments/environment';

const host = environment.HOST ?? 'localhost';
const port = environment.PORT ?? 3000;

const app = express();

app.use(bodyParser.json()); // * parser for Content-Form: application/json

// * Setup special headers to avoid CORS error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // wildcard (*)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);

app.listen(port, host, () => console.log(`[ ready ] http://${host}:${port}`));
