import express from 'express';
import { createPost, getPosts, likePost, commentPost } from '../controllers/postController.js';
import fileSizeCheck from '../middleware.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', fileSizeCheck.single('image'), createPost);
router.post('/:id/like', likePost);
router.post('/:id/comment', commentPost);

export default router;
