import express from 'express';
import { addComment, getCommentsByPhoto } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/', addComment);
router.get('/:id/comments', getCommentsByPhoto);

export default router;
