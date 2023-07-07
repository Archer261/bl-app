import express from 'express';
import { uploadImage } from '../controllers/uploadsController.js';

const router = express.Router();

// router.get('/:userId', getUser);

// router.get('/', getAllUsers);

// // Update Profile image
// router.put('/userId/profile-image', updateProfileImage);

// router.put('/:userId', updateUser);

// router.delete('/:userId', deleteUser);
router.post('/uploads', uploadImage);

export default router;