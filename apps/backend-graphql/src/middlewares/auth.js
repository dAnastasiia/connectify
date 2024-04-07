import jwt from 'jsonwebtoken';

import { createError, handleError } from '../utils/errors';

const tokenSecret = `${process.env.TOKEN_SECRET}`;

// * Incoming tokens validation
export default async (req, res, next) => {
  const authHeader = req.get('Authorization');

  try {
    if (!authHeader) createError('Not authenticated', 401);

    const token = authHeader.split(' ')[1]; // get token from header value

    let decodedToken = jwt.verify(token, tokenSecret);

    // Potential situation where no decoded token was recognized
    if (!decodedToken) createError('Not authenticated', 401);

    // Setup whom this token belongs
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    handleError(error, next);
  }
};
