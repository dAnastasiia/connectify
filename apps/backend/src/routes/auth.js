import { Router } from 'express';
import { body } from 'express-validator';

import { signup } from '../controllers/auth';
import User from '../models/user';

const router = Router();

router.post(
  '/signup',
  [
    body('name', 'Invalid name').trim().isString().isLength({ min: 5 }),
    body('email')
      .trim()
      .isEmail()
      .withMessage('Invalid email')
      .custom(async (email) => {
        try {
          const isUserExist = await User.findOne({ email });

          if (isUserExist) {
            return Promise.reject('Email is already in use');
          }
        } catch (error) {
          console.error(error);
        }
      })
      .normalizeEmail(),
    body('password', 'Invalid password').trim().isLength({ min: 8 }),
  ],
  signup
);

export default router;
