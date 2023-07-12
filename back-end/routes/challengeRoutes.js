import express from 'express';
import { createChallenge, getAllChallenges, getAllChallengeById, updateChallenge, deleteChallenge } from '../controllers/challengeController.js'
import { createParticipant, getParticipants, getParticipantById, updateParticipant, deleteParticipant } from '../controllers/participantController.js'
import { isAdmin } from '../middleware/checkAdmin.js'

const router = express.Router();

// Create a new challenge
router.post('/', isAdmin, createChallenge);

// Retrieve all challenges
router.get('/', getAllChallenges);

// Retrieve a specific challenge by ID
router.get('/:id', getAllChallengeById);

// Update a challenge
router.put('/:id', updateChallenge);

// Delete a challenge
router.delete('/:id', deleteChallenge);

// Retrieve single participant
router.get('/:challengeId/participants/:participantId', getParticipantById);

// Retrieve single participant
router.get('/:challengeId/participants', getParticipants);

// Create a new participant
router.post('/:challengeId/participants', createParticipant);

// Update a participant
router.put('/:challengeId/participants/:id', updateParticipant);

// Delete a challenge
router.delete('/:id', deleteParticipant);

export default router;