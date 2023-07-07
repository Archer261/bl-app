import express from 'express';
import {
    getNotifications,
    createNotification,
    markNotificationAsRead,
    deleteNotification
} from '../controllers/notificationController.js';

const router = express.Router();

// Get all notifications for a user
router.get('/', getNotifications);

// Create a new notification
router.post('/', createNotification);

// Mark a notification as read
router.put('/:notificationId', markNotificationAsRead);

// Delete a notification
router.delete('/:notificationId', deleteNotification);

export default router;
