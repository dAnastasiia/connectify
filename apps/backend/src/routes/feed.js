import { Router } from 'express';
import { body } from 'express-validator';
import { getPosts, getPost, createPost } from '../controllers/feed';

const router = Router();

router.get('/posts', getPosts);
router.post(
  '/post',
  [
    body('title', 'Invalid title').trim().isString().isLength({ min: 5 }),
    body('content', 'Invalid content').trim().isString().isLength({ min: 5 }),
  ],
  createPost
);
router.get('/post/:postId', getPost);

export default router;
