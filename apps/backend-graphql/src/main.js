import cors from 'cors';
import fs from 'fs';
import path from 'path';

import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import { createHandler } from 'graphql-http/lib/use/express';

import schema from './graphql/schema';
import auth from './middlewares/auth';

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

// * Middleware to handle tokens
app.use(auth);

// * REST API endpoint to work with images due to GraphQL only can use JSON format
app.put('/post-image', (req, res, next) => {
  const userId = req.userId;

  if (!userId) {
    createError('Not authenticated', 401);
  }

  const file = req.file;
  const oldPath = req.body.oldPath;
  if (!file && !oldPath) {
    return res.status(200).json({ message: 'No file provided' });
  }

  const filePath = file ? file.path.split('\\').slice(1).join('/') : oldPath;
  if (oldPath !== filePath) {
    // ! -- Temporary fix
    const filePath = path.join('tmp', oldPath);
    fs.unlink(filePath, (err) => {
      if (err) {
        throw err;
      }
    });
    // ! --
  }

  return res.status(201).json({ message: 'File stored', filePath });
});

app.all(
  '/graphql',
  createHandler({
    schema,
    context: (req, res) => ({ req }), // * pass request object to get access inside resolvers

    // * Errors handler for GraphQL
    formatError(err) {
      console.error(err);
      const originalError = err.originalError;

      const status = originalError?.statusCode || 500;
      const message = originalError?.message || 'An error occured';
      const errors = originalError?.data;

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
