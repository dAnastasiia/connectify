// Logic to handle incoming queries
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';

import Post from '../models/post';
import User from '../models/user';

import { createError } from '../utils/errors';

const saltRound = +process.env.SALT_ROUND;
const tokenSecret = `${process.env.TOKEN_SECRET}`;

export default {
  signup: async function (parent, { inputData }, context) {
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

  login: async function (parent, { inputData }, context) {
    const { email, password } = inputData;
    const errors = [];

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
    if (!user) {
      createError('User is not found', 404);
    }

    const isEqualPasswords = await bcrypt.compare(password, user.password);

    if (!isEqualPasswords) {
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

    return { accessToken, userId };
  },

  logout: (parent, args, context) => {
    // Invalidate the token on the server-side
    // ! should be provided invalidation logic

    return true; // Indicate successful logout
  },

  // Utils
  getUserById: async function (parent, args, context) {
    const userId = parent.author._id;

    const user = await User.findById(userId);
    return user;
  },
  getPostsByUserId: async function (parent, args, context) {
    const userId = parent._id;

    const posts = await Post.find({ authorId: userId });
    return posts;
  },
};
