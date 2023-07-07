import express from 'express';
import { updateProfileImage, uploadProfileImage, getUser, updateUser, deleteUser, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/:userId', getUser);

router.get('/', getAllUsers);

// Update Profile image
//router.put('/userId/profile-image', updateProfileImage);

router.post('/:userId/upload', uploadProfileImage)

router.put('/:userId', updateUser);

router.delete('/:userId', deleteUser);

// Login user
//router.post('/login', login);

export default router;