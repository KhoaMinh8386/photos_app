import prisma from '../config/prisma.js';

export const addComment = async (req, res) => {
    const { photoId, content } = req.body;
    try {
        const comment = await prisma.comment.create({
            data: { photoId, content }
        });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
};

export const getCommentsByPhoto = async (req, res) => {
    const { id } = req.params;
    try {
        const comments = await prisma.comment.findMany({
            where: { photoId: id },
            orderBy: { createdAt: 'desc' }
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};
