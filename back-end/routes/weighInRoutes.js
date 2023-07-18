import express from 'express';
import { createWeighIn, getWeighInsById, deteleWeighInById, createWeighIns } from '../controllers/weighInController.js'
// import { } from '../middleware/authMiddleware';

const router = express.Router();

// Create a new challenge
router.post('/', createWeighIns);

// // Retrieve all challenges
// router.get('/', getAllWeighIns);

// // Retrieve a specific challenge by ID
router.get('/:id', getWeighInsById);

// // Update a challenge
// router.put('/:id', updateWeighIn);

// Delete a challenge
router.delete('/:id', deteleWeighInById);

export default router;