// Example implementation of the authorizeUser middleware
const authorizeUser = async (req, res, next) => {
    try {
        const challengeId = req.params.id;
        const userId = req.user.id; // Assuming the authenticated user ID is stored in req.user.id

        const challenge = await Challenge.findById(challengeId);

        if (!challenge) {
            return res.status(404).json({ error: 'Challenge not found' });
        }

        if (challenge.owner !== userId && challenge.creator !== userId) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    authenticateUser,
    authorizeUser,
};
