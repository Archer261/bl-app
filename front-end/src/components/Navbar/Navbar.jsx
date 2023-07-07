import React, { useContext } from 'react'
import { NotificationBell } from '../index';
import { AuthContext } from '../../utils/AuthContext';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {

    const { isAuthenticated, logout, user } = useContext(AuthContext);

    const handleLogout = () => {
        logout(); // Call the logout function when the logout button is clicked
    };

    const unreadNotificationCount = 3; // Example count
    return (
        <nav className="mt-1 mb-4 px-4 rounded-lg backdrop-filter backdrop-blur-lg w-4/5">
            <div className="container mx-auto flex items-center justify-between">
                <Link to={'/'}> <div className="text-black font-bold text-xl max-w-sm">
                    <motion.div
                        whileTap={{ scale: 0.8 }} // Shrinks on click
                        whileHover={{ scale: 1.2 }} // Grows on hover
                    >
                        <img className='w-16' src={logo} />
                    </motion.div>
                </div></Link>
                {isAuthenticated && (
                    <>
                        <ul className="flex space-x-4">
                            <li><a href="#" className="text-black hover:text-blue-200">My Challenges</a></li>
                            <li><a href="/challenge" className="text-black hover:text-blue-200">Leaderboards</a></li>
                            <li><a href="#" className="text-black hover:text-blue-200">Contact</a></li>
                        </ul>


                        <div className='flex'>

                            <button
                                className="text-white hover:text-blue-200 ml-2"
                                onClick={handleLogout} // Call handleLogout function on button click
                            >
                                logout
                            </button>

                        </div>
                    </>
                )}
            </div>

        </nav>
    )
}

export default Navbar