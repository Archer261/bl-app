import express from 'express';
import { login, signup } from '../controllers/authController.js';

const router = express.Router();

// Create new user
router.post('/signup', signup);

// Login user
router.post('/', login);

export default router;