import express from 'express';
import { createWeighIn } from '../controllers/weighInController.js'
// import { } from '../middleware/authMiddleware';

const router = express.Router();

// Create a new challenge
router.post('/', createWeighIn);

// // Retrieve all challenges
// router.get('/', getAllWeighIns);

// // Retrieve a specific challenge by ID
// router.get('/:id', getWeighInsById);

// // Update a challenge
// router.put('/:id', updateWeighIn);

// // Delete a challenge
// router.delete('/:id', deleteWeighIn);

export default router;