import express from 'express';
import { registerArtist, loginUser, getMe } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Authentication Routes
router.post('/register', registerArtist);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

export default router;
