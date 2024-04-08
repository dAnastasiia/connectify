import fs from 'fs';
import path from 'path';

import Post from '../models/post';
import User from '../models/user';
import { createError, handleError } from '../utils/errors';

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
