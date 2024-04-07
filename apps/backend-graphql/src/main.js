import cors from 'cors';
import path from 'path';

import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import { createHandler } from 'graphql-http/lib/use/express';

import { schema, newSchema } from './graphql/schema';
import resolvers from './graphql/resolvers';

import { environment } from './environments/environment';

const host = environment.HOST ?? 'localhost';
const port = environment.PORT ?? 3000;
const uriDb = environment.URI_DB;
const imagesLocation = path.join('tmp', 'images'); // ! Temporary fix

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'tmp/images'),
  filename: (req, file, cb) =>
    cb(null, `${Date.now().toString()}-${file.originalname}`),
});
const fileFilter = (req, file, cb) => {
  const allowedMimetypes = ['image/png', 'image/jpg', 'image/jpeg'];

  if (allowedMimetypes.includes(file.mimetype)) {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
};

app.use(bodyParser.json()); // * parser for Content-Form: application/json
app.use(multer({ storage, fileFilter }).single('image'));
app.use('/images', express.static(imagesLocation));

// * Setup special headers to avoid CORS error
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.all(
  '/graphql',
  createHandler({
    //  schema,
    //  rootValue: resolvers,
    schema: newSchema,
    // * Errors handler for GraphQL
    formatError(err) {
      const originalError = err.originalError;

      const status = originalError.statusCode || 500;
      const message = originalError.message || 'An error occured';
      const errors = originalError.data;

      return { message, status, errors };
    },
  })
);

mongoose
  .connect(uriDb)
  .then(() =>
    app.listen(port, host, () => {
      console.log(`Running on http://${host}:${port}`);
    })
  )
  .catch((err) => console.error(err));
