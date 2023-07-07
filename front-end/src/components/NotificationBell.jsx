import React, { useState } from 'react';
import { AiFillBell } from 'react-icons/ai';

const NotificationBell = ({ count }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleNotificationClick = (notificationId) => {
        // Perform any action you want when a notification is clicked
        console.log(`Notification ${notificationId} clicked`);
    };

    return (
        <div className="relative">
            <button className="relative" onClick={toggleDropdown}>
                <AiFillBell className="w-10 h-10" />
                {count > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">{count}</span>
                )}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded shadow-lg">
                    {/* Notification list */}
                    <ul>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleNotificationClick(1)}>Notification 1</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleNotificationClick(2)}>Notification 2</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleNotificationClick(3)}>Notification 3</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;