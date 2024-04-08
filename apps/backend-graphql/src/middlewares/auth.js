import jwt from 'jsonwebtoken';

import { handleError } from '../utils/errors';

const tokenSecret = `${process.env.TOKEN_SECRET}`;

// * Incoming tokens validation
export default async (req, res, next) => {
  const authHeader = req.get('Authorization');

  try {
    if (!authHeader) return next();

    const token = authHeader.split(' ')[1]; // get token from header value

    if (!token) return next();

    // ? check if jwt is valid, them throw an error

    let decodedToken = jwt.verify(token, tokenSecret);

    // Potential situation where no decoded token was recognized
    if (!decodedToken) return next();

    // Setup whom this token belongs

    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    handleError(error, next);
  }
};
