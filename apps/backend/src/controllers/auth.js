import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import User from '../models/user';
import { createError, handleError } from '../utils/errors';

const saltRound = +process.env.SALT_ROUND;

export const signup = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      createError('Data is incorrect', 422, errors.array());
    }

    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const data = new User({
      name,
      email,
      password: hashedPassword,
      posts: [],
    });

    await data.save();

    res.status(201).json({ message: 'Successfull signup' });
  } catch (error) {
    handleError(error, next);
  }
};
