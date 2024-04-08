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
  // Authentication
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

  // Posts
  createPost: async function (parent, { inputData }, { req }) {
    const userId = req.raw.userId;

    if (!userId) {
      createError('Not authenticated', 401);
    }

    const { title, content, imageUrl } = inputData;
    const errors = [];

    if (!validator.isLength(title, { min: 5 }))
      errors.push({ msg: 'Invalid title' });
    if (!validator.isLength(content, { min: 5 }))
      errors.push({ msg: 'Invalid content' });
    if (validator.isEmpty(imageUrl)) errors.push({ msg: 'No image provided' });

    if (errors.length) {
      createError('Data is incorrect', 422, errors);
    }

    const user = await User.findById(userId);
    if (!user) {
      createError('User is not found', 404);
    }

    const data = new Post({
      title,
      content,
      imageUrl,
      author: user,
    });

    const createdPost = await data.save();
    user.posts.push(createdPost);
    await user.save();

    return createdPost;
  },

  getPosts: async function (parent, { page }, { req }) {
    const userId = req.raw.userId;

    if (!userId) {
      createError('Not authenticated', 401);
    }

    const pageNumber = +page || 1;
    const pageSize = 4;

    const totalCount = await Post.find().countDocuments();
    const data = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 }) // * descending order by creation date
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    const parsedData = data.map((post) => {
      return {
        ...post._doc,
        _id: post._id.toString(),
        createdAt: post.createdAt.toISOString(), // * GraphQL doesn't parse datetime correctly, so this is a need
        updatedAt: post.updatedAt.toISOString(),
      };
    });

    return { data: parsedData, pageNumber, pageSize, totalCount };
  },

  getPost: async function (parent, { id }, { req }) {
    const userId = req.raw.userId;

    if (!userId) {
      createError('Not authenticated', 401);
    }

    const post = await Post.findById(id).populate('author', 'name email');

    if (!post) {
      createError("Couldn't find the post", 404);
    }

    return {
      ...post._doc,
      _id: post._id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
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
