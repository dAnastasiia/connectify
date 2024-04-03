import { validationResult } from 'express-validator';

import Post from '../models/post';

import handleError from '../utils/handleError';

export const getPosts = async (req, res, next) => {
  try {
    const data = await Post.find();

    res.status(200).json({ data });
  } catch (err) {
    handleError(error, next); // * Check if it's the server error
  }
};

export const getPost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error("Couldn't fint the post");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ ...post._doc });
  } catch (error) {
    handleError(error, next);
  }
};

export const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  const file = req.file;

  if (!file) {
    const error = new Error('Image is not provided');
    error.statusCode = 422;
    throw error;
  }

  if (!errors.isEmpty()) {
    const error = new Error('Data is incorrect');
    error.statusCode = 422;
    throw error;
  }

  const imageUrl = file.path.split('\\').slice(1).join('/'); // ! Temporary fix
  const { title, content } = req.body;

  try {
    const data = new Post({
      title,
      content,
      imageUrl,
      author: 'G. Weeles',
    });

    await data.save();

    res.status(201).json({
      message: 'Successfully created',
      data,
    });
  } catch (error) {
    handleError(error, next);
  }
};
