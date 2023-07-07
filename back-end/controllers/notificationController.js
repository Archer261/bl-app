// controllers/notificationController.js
import Notification from '../models/Notification.js';

// Get all notifications for a user
export const getNotifications = async (req, res) => {
    try {
        const { userId } = req.query;
        const notifications = await Notification.find({ user: userId });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve notifications' });
    }
};

// Create a new notification
export const createNotification = async (req, res) => {
    try {
        const { userId, message } = req.body;
        const newNotification = new Notification({ user: userId, message });
        const savedNotification = await newNotification.save();
        res.status(201).json(savedNotification);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create notification' });
    }
};

// Mark a notification as read
export const markNotificationAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const updatedNotification = await Notification.findByIdAndUpdate(
            notificationId,
            { isRead: true },
            { new: true }
        );
        res.status(200).json(updatedNotification);
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark notification as read' });
    }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const deletedNotification = await Notification.findByIdAndDelete(notificationId);
        res.status(200).json(deletedNotification);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete notification' });
    }
};
