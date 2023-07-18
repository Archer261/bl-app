import { Challenge, WeighIn, WeighInWeek } from '../models/Challenge.js';

//GET single weigh In
export const getWeighInsById = async (req, res) => {
  const weighInId = req.params.id;
  try {
    const weighIn = await WeighIn.findById(weighInId);
    if (!weighIn) {
      return res.status(404).json({ message: 'Weigh-in not found' });
    }
    res.json(weighIn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /weigh-in
export const createWeighIn = async (req, res) => {
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

// Add an array of weigh ins
export const createWeighIns = async (req, res) => {
  try {
    const { challengeId, weighIns } = req.body;

    // Find the challenge by ID
    const challenge = await Challenge.findById(challengeId);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Iterate over each weigh-in record in the week
    for (const weighInData of weighIns) {
      const { user, currentWeight, currentSize } = weighInData;

      // Find the participant within the challenge
      const participant = challenge.participants.find(
        (participant) => participant.user.toString() === user
      );

      if (participant) {
        // Calculate the weight percentage change
        const weightPercentageChange =
          (currentWeight - participant.startingWeight) / participant.startingWeight;

        // Check if weightPercentageChange is a valid number (not NaN)
        if (!isNaN(weightPercentageChange)) {
          participant.weightPercentChange = Number((weightPercentageChange * 100).toFixed(2));
        } else {
          // Handle invalid weightPercentageChange (e.g., set it to a default value)
          participant.weightPercentChange = 0;
        }

        if (challenge.withSize && participant.startingSize !== undefined) {
          // Calculate the size percentage change
          const sizePercentageChange =
            (currentSize - participant.startingSize) / participant.startingSize;

          // Check if sizePercentageChange is a valid number (not NaN)
          if (!isNaN(sizePercentageChange)) {
            participant.sizePercentChange = Number((sizePercentageChange * 100).toFixed(2));
          } else {
            // Handle invalid sizePercentageChange (e.g., set it to a default value)
            participant.sizePercentChange = 0;
          }
        }
      }
    }

    // Save the updated participants
    await challenge.save();

    // Create a new weigh-in week
    const newWeighInWeek = new WeighInWeek({
      challengeId,
      weighIns,
    });

    // Save the new weigh-in week
    await newWeighInWeek.save();

    // Add the new weighInWeek to the weighIns array on the challenge object
    challenge.weighIns.push(newWeighInWeek);
    await challenge.save();

    res.status(200).json({ message: 'Weigh-ins saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
};


// Delete Single Weigh-in
export const deteleWeighInById = async (req, res) => {
  const weighInId = req.params.id;
  try {
    const weighIn = await WeighIn.findById(weighInId);
    if (!weighIn) {
      return res.status(404).json({ message: 'Weigh-in not found' });
    }
    await weighIn.remove();
    res.json({ message: 'Weigh-in deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
