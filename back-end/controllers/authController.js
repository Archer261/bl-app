import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User.js'

// Register a new user
export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the username or email already exists
        const existingUser = await User.findOne().or([{ username }, { email }]);

        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Create a new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        // Generate a JWT token
        const token = generateToken(newUser._id);

        // Return the token and user details
        return res.json({ token, user: { username: newUser.username, email: newUser.email, id: newUser._id } })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Login user
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email or email
        const user = await User.findOne().or([{ email }, { email: email }]);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the user's hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate a JWT token
        const token = generateToken(user._id);

        // Return the token and user details
        return res.json({ token, user: { username: user.username, email: user.email, id: user._id, firstName: user.firstName, lastName: user.lastName, profileImage: user.profileImage } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Generate a JWT token
const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    return token;
};