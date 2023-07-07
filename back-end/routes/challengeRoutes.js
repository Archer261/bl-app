import express from 'express';
import { createChallenge, getAllChallenges, getAllChallengeById, updateChallenge, deleteChallenge } from '../controllers/challengeController.js'
// import { } from '../middleware/authMiddleware';

const router = express.Router();

// Create a new challenge
router.post('/', createChallenge);

// Retrieve all challenges
router.get('/', getAllChallenges);

// Retrieve a specific challenge by ID
router.get('/:id', getAllChallengeById);

// Update a challenge
router.put('/:id', updateChallenge);

// Delete a challenge
router.delete('/:id', deleteChallenge);

export default router;