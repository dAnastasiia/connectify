import { Router } from 'express';
import { body } from 'express-validator';

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/feed';

import isAuth from '../middlewares/auth';

const router = Router();

// GET posts
router.get('/posts', isAuth, getPosts);

// CREATE post
router.post(
  '/post',
  isAuth,
  [
    body('title', 'Invalid title').trim().isString().isLength({ min: 5 }),
    body('content', 'Invalid content').trim().isString().isLength({ min: 5 }),
  ],
  createPost
);

// UPDATE post
router.put(
  '/post/:postId',
  isAuth,
  [
    body('title', 'Invalid title').trim().isString().isLength({ min: 5 }),
    body('content', 'Invalid content').trim().isString().isLength({ min: 5 }),
  ],
  updatePost
);

// DELETE post
router.delete('/post/:postId', isAuth, deletePost);

// READ post
router.get('/post/:postId', isAuth, getPost);

export default router;
