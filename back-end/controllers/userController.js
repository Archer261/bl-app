import User from '../models/User.js'

// Get User Profile
export const getUser = async (req, res) => {

    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};


// Update User Profile
export const updateUser = async (req, res) => {
    try {
        console.log(req)
        const user = await User.findById(req.params.userId).select('-password');
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        Object.keys(req.body).forEach((key) => {
            user[key] = req.body[key];
        });

        await user.save();

        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete User
export const deleteUser = async (req, res) => {

    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.id !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        user.remove();

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Profile Image
export const updateProfileImage = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.id !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }
        user.profileImage = req.file.path;
        await user.save();
        return res.status(200).json({ message: 'Profile image updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update profile image' });
    }
};

// Upload Profile Image
export const uploadProfileImage = async (req, res) => {
    try {
        await uploadFilesMiddleware(req, res);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to upload profile image' });
    }
};

