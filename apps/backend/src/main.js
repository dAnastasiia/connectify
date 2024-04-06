import path from 'path';

import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import authRoutes from './routes/auth';
import feedRoutes from './routes/feed';

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
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // wildcard (*)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

// * Errors handler
app.use((error, req, res, next) => {
  console.error('Error handler: ', error);
  const status = error.statusCode || 500;
  const message = error.message;
  const errors = error.data;

  res.status(status).json({ message, errors });
});

mongoose
  .connect(uriDb)
  .then(() =>
    app.listen(port, host, () =>
      console.log(`Running on http://${host}:${port}`)
    )
  )
  .catch((err) => console.error(err));
