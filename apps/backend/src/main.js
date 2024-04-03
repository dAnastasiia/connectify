import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import feedRoutes from './routes/feed';

import { environment } from './environments/environment';

const host = environment.HOST ?? 'localhost';
const port = environment.PORT ?? 3000;
const uriDb = environment.URI_DB;
const imagesLocation = path.join('tmp', 'images'); // ! Temporary fix

const app = express();

app.use(bodyParser.json()); // * parser for Content-Form: application/json
app.use('/images', express.static(imagesLocation));

// * Setup special headers to avoid CORS error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // wildcard (*)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);

// * Errors handler
app.use((error, req, res, next) => {
  console.error('error: ', error);
  const status = error.statusCode || 500;
  const message = error.message;

  res.status(status).json({ message });
});

mongoose
  .connect(uriDb)
  .then(() =>
    app.listen(port, host, () =>
      console.log(`Running on http://${host}:${port}`)
    )
  )
  .catch((err) => console.error(err));
