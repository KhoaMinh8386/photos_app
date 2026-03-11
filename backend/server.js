import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import photoRoutes from './routes/photo.routes.js';
import commentRoutes from './routes/comment.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/photos', photoRoutes);
app.use('/api/comments', commentRoutes);

app.get('/', (req, res) => {
    res.send('Photo App API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
