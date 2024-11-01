// Logic to handle incoming queries
import bcrypt from 'bcrypt';
import validator from 'validator';

import User from '../models/user';

import { createError } from '../utils/errors';

const saltRound = +process.env.SALT_ROUND;

export default {
  signup: async function ({ inputData }, req) {
    const { name, email, password } = inputData;
    const errors = [];

    if (!validator.isLength(name, { min: 5 }))
      errors.push({ msg: 'Invalid name' });

    if (!validator.isEmail(email)) errors.push({ msg: 'Invalid email' });

    if (
      validator.isEmpty(password) ||
      !validator.isLength(password, { min: 8 })
    )
      errors.push({ msg: 'Invalid password' });

    if (errors.length) {
      createError('Data is incorrect', 422, errors);
    }

    const user = await User.findOne({ email });
    if (user) {
      createError('User with such email already exists', 422);
    }

    const hashedPassword = await bcrypt.hash(password, saltRound);

    const data = new User({
      name,
      email,
      password: hashedPassword,
      posts: [],
    });

    const createdUser = await data.save();

    return {
      ...createdUser._doc,
      _id: createdUser._id.toString(),
    };
  },
};
