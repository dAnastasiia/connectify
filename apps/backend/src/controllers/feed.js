import fs from 'fs';
import path from 'path';

import { validationResult } from 'express-validator';

import socket from '../socket';

import Post from '../models/post';
import User from '../models/user';
import { createError, handleError } from '../utils/errors';

export const getPosts = async (req, res, next) => {
  const pageNumber = +req.query.page || 1;
  const pageSize = 4;

  try {
    const totalCount = await Post.find().countDocuments();
    const data = await Post.find()
      .populate('author', 'name email')
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    res.status(200).json({ data, pageNumber, pageSize, totalCount });
  } catch (err) {
    handleError(error, next); // * Check if it's the server error
  }
};

export const getPost = async (req, res, next) => {
  const { userId } = req;
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate('author', 'name email');

    if (!post) {
      createError("Couldn't find the post", 404);
    }

    res.status(200).json({ ...post._doc });
  } catch (error) {
    handleError(error, next);
  }
};

export const createPost = async (req, res, next) => {
  const { userId } = req;
  const errors = validationResult(req);
  const file = req.file;

  try {
    if (!file) {
      createError('Image is not provided', 422); // * Erors should be inside trycatch to global error handler can get it
    }

    if (!errors.isEmpty()) {
      createError('Data is incorrect', 422, errors.array());
    }

    const imageUrl = file.path.split('\\').slice(1).join('/'); // ! Temporary fix
    const { title, content } = req.body;

    const data = new Post({
      title,
      content,
      imageUrl,
      author: userId,
    });

    await data.save();

    const user = await User.findById(userId);
    user.posts.push(data);

    await user.save();

    const post = await data.populate('author', 'name email');

    // * Notify about new posts other users
    socket.getIO().emit('posts', { action: 'create', post });

    res.status(201).json({
      message: 'Successfully created',
      data,
    });
  } catch (error) {
    handleError(error, next);
  }
};

export const updatePost = async (req, res, next) => {
  const { userId } = req;
  const { postId } = req.params;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      createError('Data is incorrect', 422, errors.array());
    }

    const file = req.file;
    const { title, content, imageUrl } = req.body;
    const fileImageUrl = file
      ? file.path.split('\\').slice(1).join('/')
      : imageUrl; // ! Temporary fix

    if (!imageUrl && !file) {
      createError('Image is not provided', 422);
    }

    const post = await Post.findById(postId);

    if (!post) {
      createError("Couldn't find the post", 404);
    }

    const isCreator = post.author?.toString() === userId;

    if (!isCreator) {
      createError('Not authorized', 403);
    }

    post.title = title;
    post.content = content;

    if (imageUrl !== fileImageUrl) {
      // ! -- Temporary fix
      const filePath = path.join('tmp', imageUrl);
      fs.unlink(filePath, (err) => {
        if (err) {
          throw err;
        }
      });
      // ! --

      post.imageUrl = file.path.split('\\').slice(1).join('/'); // ! Temporary fix
    }

    await post.save();

    res.status(200).json({ message: 'Successfully updated', post: post._doc });
  } catch (error) {
    handleError(error, next);
  }
};

export const deletePost = async (req, res, next) => {
  const { userId } = req;
  const { postId: _id } = req.params;

  try {
    const post = await Post.findById(_id);

    if (!post) {
      createError("Couldn't find the post", 404);
    }

    const isCreator = post.author?.toString() === userId;

    if (!isCreator) {
      createError('Not authorized', 403);
    }

    await Post.deleteOne({ _id });
    // ! -- Temporary fix
    const filePath = path.join('tmp', post.imageUrl);
    fs.unlink(filePath, (err) => {
      if (err) {
        throw err;
      }
    });
    // ! --

    const user = await User.findById(userId);

    user.posts.pull(_id); // * remove post from user obj
    await user.save();

    res.status(200).json({ message: 'Successfully deleted' });
  } catch (error) {
    handleError(error, next);
  }
};
