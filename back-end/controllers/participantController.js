import { Challenge, WeighIn, Participant } from '../models/Challenge.js';
import User from '../models/User.js';

export const getParticipantById = async (req, res) => {
    try {
        const { challengeId, participantId } = req.params;

        // Find the challenge by ID and populate the participants
        const challenge = await Challenge.findById(challengeId).populate({
            path: 'participants.user',
            select: '-password -notifications -createdAt -updatedAt -isTest -isAdmin'
        });

        if (!challenge) {
            return res.status(404).json({ error: 'Challenge not found' });
        }

        const participant = challenge.participants.find(participant => participant._id.equals(participantId));

        if (!participant) {
            return res.status(404).json({ error: 'Participant not found' });
        }

        res.status(200).json({ participant });
    } catch (error) {
        console.error('Error retrieving participant:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get all participants of a single challenge
export const getParticipants = async (req, res) => {
    try {
        const { challengeId } = req.params;

        // Find the challenge by ID and populate the participants
        const challenge = await Challenge.findById(challengeId).populate('participants');

        if (!challenge) {
            return res.status(404).json({ error: 'Challenge not found' });
        }

        const participants = challenge.participants;

        res.status(200).json({ participants });
    } catch (error) {
        console.error('Error retrieving participants:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Create single participant
export const createParticipant = async (req, res) => {
    try {
        const { challengeId } = req.params;
        const { user, buyInStatus, startingWeight, startingSize } = req.body;

        // Find the challenge by ID
        const challenge = await Challenge.findById(challengeId);

        if (!challenge) {
            return res.status(404).json({ error: 'Challenge not found' });
        }

        // Check if the participant already exists in the challenge
        const existingParticipant = challenge.participants.find(participant => participant.user.equals(user));

        if (existingParticipant) {
            return res.status(400).json({ error: 'Participant already exists in the challenge' });
        }

        // Create a new participant
        const newParticipant = {
            user,
            buyInStatus,
            startingWeight,
            startingSize
        };

        // Add the new participant to the participants array of the challenge
        challenge.participants.push(newParticipant);

        // Save the updated challenge
        await challenge.save();

        res.status(201).json({ participant: newParticipant });
    } catch (error) {
        console.error('Error creating participant:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Update a single participant
export const updateParticipant = async (req, res) => {
    try {
        const { challengeId, id } = req.params;

        const { startingWeight, startingSize, buyIn } = req.body;

        // Find the challenge by ID
        const challenge = await Challenge.findById(challengeId);

        if (!challenge) {
            return res.status(404).json({ error: 'Challenge not found' });
        }

        // Find the participant within the challenge's participants array
        const participantIndex = challenge.participants.findIndex(participant => participant._id.equals(id));

        if (participantIndex === -1) {
            return res.status(404).json({ error: 'Participant not found in the challenge' });
        }

        // Update the participant's properties
        challenge.participants[participantIndex].startingWeight = startingWeight;
        challenge.participants[participantIndex].startingSize = startingSize;
        challenge.participants[participantIndex].buyInStatus = buyIn;

        // Save the updated challenge
        await challenge.save();

        res.status(200).json({ participant: challenge.participants[participantIndex] });
    } catch (error) {
        console.error('Error updating participant:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a single participant
export const deleteParticipant = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the participant by ID and remove it
        const participant = await Participant.findByIdAndRemove(id);

        if (!participant) {
            return res.status(404).json({ error: 'Participant not found' });
        }

        res.status(200).json({ message: 'Participant deleted successfully' });
    } catch (error) {
        console.error('Error deleting participant:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
