import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import { createError, handleError } from '../utils/errors';

const saltRound = +process.env.SALT_ROUND;
const tokenSecret = `${process.env.TOKEN_SECRET}`;

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

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      createError('User is not found', 401);
    }

    const isPasswordsMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordsMatch) {
      createError('Inavalid credentials', 404);
    }

    const userId = user._id.toString();
    const accessToken = jwt.sign(
      {
        email,
        userId,
      },
      tokenSecret,
      { expiresIn: '1h' }
    );

    res.status(200).json({ accessToken, userId });
  } catch (error) {
    handleError(error, next);
  }
};

export const logout = (req, res, next) => {
  res.status(200).send('Logged out successfully');
};
