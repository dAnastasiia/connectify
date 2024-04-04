import { Router } from 'express';
import { body } from 'express-validator';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/feed';

const router = Router();

// GET posts
router.get('/posts', getPosts);

// GET post
router.get('/post/:postId', getPost);

// CREATE post
router.post(
  '/post',
  [
    body('title', 'Invalid title').trim().isString().isLength({ min: 5 }),
    body('content', 'Invalid content').trim().isString().isLength({ min: 5 }),
  ],
  createPost
);

// UPDATE post
router.put(
  '/post/:postId',
  [
    body('title', 'Invalid title').trim().isString().isLength({ min: 5 }),
    body('content', 'Invalid content').trim().isString().isLength({ min: 5 }),
  ],
  updatePost
);

// DELETE post
router.delete('/post/:postId', deletePost);

export default router;
