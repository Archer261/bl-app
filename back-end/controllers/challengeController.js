import { Challenge, WeighIn, Participant } from '../models/Challenge.js';
import User from '../models/User.js';

// Create a new challenge
export const createChallenge = async (req, res) => {
    try {
        const challenge = new Challenge(req.body);
        await challenge.save();
        res.status(201).json(challenge);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Retrieve all challenges
export const getAllChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find();
        res.json(challenges);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Retrieve a specific challenge
export const getAllChallengeById = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id)
            .populate({
                path: 'participants.user',
                select: '-password -startingWeight -startingSize'
            }).populate({
                path: 'weighIns.user',
                select: '-password'
            }).populate({
                path: 'organizer',
                select: '-password'
            })
        if (!challenge) {
            return res.status(404).json({ error: 'Challenge not found' });
        }
        res.json(challenge);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error)
    }
};

// Update a challenge
export const updateChallenge = async (req, res) => {
    try {
        const challenge = await Challenge.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!challenge) {
            return res.status(404).json({ error: 'Challenge not found' });
        }
        res.json(challenge);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a challenge
export const deleteChallenge = async (req, res) => {
    try {
        const challenge = await Challenge.findByIdAndDelete(req.params.id);
        if (!challenge) {
            return res.status(404).json({ error: 'Challenge not found' });
        }
        res.json({ message: 'Challenge deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
