import express from 'express';
import { createPost, getPosts } from '../controllers/postController.js';
import { registerUser, loginUser } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import upload from '../config/multer.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/authtoken', authenticateToken, (req, res) => {
    res.json({ message: 'Token autenticado com Sucesso!' });
});
router.post('/posts', authenticateToken, upload.single('image'), createPost);
router.get('/posts', authenticateToken, getPosts);

export default router;
