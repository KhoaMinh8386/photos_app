import prisma from '../config/prisma.js';
import { uploadToSupabase } from '../services/supabase.service.js';

export const uploadPhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        const imageUrl = await uploadToSupabase(req.file);

        const photo = await prisma.photo.create({
            data: { imageUrl },
            include: { comments: true }
        });

        res.status(201).json(photo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload photo' });
    }
};

export const getAllPhotos = async (req, res) => {
    try {
        const photos = await prisma.photo.findMany({
            include: { comments: { orderBy: { createdAt: 'desc' } } },
            orderBy: { createdAt: 'desc' }
        });
        res.json(photos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch photos' });
    }
};
