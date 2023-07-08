import { Challenge, WeighIn } from '../models/Challenge.js';


// POST /weigh-in
export const createWeighIn = async (req, res) => {
    console.log('test: ' + req);
    try {
        const { challengeId, user, currentWeight, currentSize } = req.body;

        // Find the weight loss challenge based on the challenge ID
        const challenge = await Challenge.findById(challengeId);

        if (!challenge) {
            return res.status(404).json({ message: 'Weight loss challenge not found.' });
        }

        if (!challenge.weighIns) {
            challenge.weighIns = [];
        }

        // Add the weigh-in to the weighIns array
        challenge.weighIns.push({ user: user, currentSize: currentSize, currentWeight: currentWeight, challengeId: challengeId });

        // Save the updated challenge with the new weigh-in
        await challenge.save();

        return res.status(201).json({ message: 'Weigh-in recorded successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while recording the weigh-in.' });
    }
};
