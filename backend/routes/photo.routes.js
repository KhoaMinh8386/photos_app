import express from 'express';
import { uploadPhoto, getAllPhotos } from '../controllers/photo.controller.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

router.post('/upload', upload.single('photo'), uploadPhoto);
router.get('/', getAllPhotos);

export default router;
