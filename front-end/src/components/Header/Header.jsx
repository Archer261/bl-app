import React, { useContext, useState, useEffect } from 'react';
import { NotificationBell } from '../index';
import { AuthContext } from '../../utils/AuthContext';
import logo from '../../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const [showMenu, setShowMenu] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    const handleLogout = () => {
        logout(); // Call the logout function when the logout button is clicked
        setShowMenu(false); // Hide the menu dropdown after logout
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Set isMobile state based on screen size
            setShowMenu(false); // Hide the menu dropdown when screen size changes
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleClickOption = () => {
        setShowMenu(false); // Hide the menu dropdown when an option is clicked
    };

    return (
        <header className="bg-white fixed w-full">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link to={'/'}>
                    <div className="text-black font-bold text-xl max-w-sm">
                        <motion.div
                            whileTap={{ scale: 0.9 }} // Shrinks on click
                            whileHover={{ scale: 1.02 }} // Grows on hover
                        >
                            <img className="w-10" src={logo} alt="Logo" />
                        </motion.div>
                    </div>
                </Link>

                <nav aria-label="Global" className="hidden md:block">
                    {isAuthenticated && (
                        <>
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <Link to={'/'}>
                                        <a
                                            className={`text-gray-500 transition hover:text-gray-500/75 ${location.pathname === '/challenge' ? 'font-semibold' : ''
                                                }`}
                                            onClick={handleClickOption}
                                        >
                                            Home
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/users/${user.id}`}>
                                        <a
                                            className={`text-gray-500 transition hover:text-gray-500/75 ${location.pathname === '/challenge' ? 'font-semibold' : ''
                                                }`}
                                            onClick={handleClickOption}
                                        >
                                            Profile
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/challenge'}>
                                        <a
                                            className={`text-gray-500 transition hover:text-gray-500/75 ${location.pathname === '/challenge' ? 'font-semibold' : ''
                                                }`}
                                            onClick={handleClickOption}
                                        >
                                            My Challenges
                                        </a>
                                    </Link>
                                </li>

                                <li>
                                    <Link to={'/challenge'}>
                                        <a
                                            className={`text-gray-500 transition hover:text-gray-500/75 ${location.pathname === '/challenge' ? 'font-semibold' : ''
                                                }`}
                                            onClick={handleClickOption}
                                        >
                                            All Challenges
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </>
                    )}
                </nav>

                <div className="flex items-center gap-4">
                    {!isMobile && (
                        !isAuthenticated && (
                            <Link to={'/login'}>
                                <div className="block rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 cursor-pointer">
                                    Login
                                </div>
                            </Link>
                        )
                    )}
                    {isAuthenticated && (
                        <div className="sm:flex sm:gap-4">
                            <Link to={`/users/${user.id}`} className="block shrink-0">
                                <span className="sr-only">Profile</span>
                                <img
                                    alt="Profile"
                                    src={user.profileImage}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                            </Link>
                            {!isMobile && (
                                <a
                                    className="block rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 cursor-pointer"
                                    onClick={handleLogout} // Call handleLogout function on button click
                                >
                                    Logout
                                </a>
                            )}
                        </div>
                    )}

                    <div className="relative">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className={`${showMenu ? 'text-gray-600' : 'text-gray-700'
                                } md:hidden block bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75`}
                        >
                            <span className="sr-only">Toggle menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        {showMenu && (
                            <div className="absolute z-50 top-12 right-0 bg-white shadow-lg rounded-md w-40">
                                <ul className="py-2">
                                    {isAuthenticated && (
                                        <>
                                            {!isMobile && (
                                                <li>
                                                    <Link to={`/users/${user.id}`}>
                                                        <a
                                                            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                                                            onClick={handleClickOption}
                                                        >
                                                            Profile
                                                        </a>
                                                    </Link>
                                                </li>
                                            )}
                                            <li>
                                                <Link to="/">
                                                    <a
                                                        onClick={handleClickOption}
                                                        className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                                                    >
                                                        Home
                                                    </a>
                                                </Link>
                                            </li>
                                            {user.isAdmin && (
                                                <li>
                                                    <Link to="/create-user">
                                                        <a
                                                            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                                                            onClick={handleClickOption}
                                                        >
                                                            Create User
                                                        </a>
                                                    </Link>
                                                </li>
                                            )}
                                            <li>
                                                <Link to="/">
                                                    <a
                                                        className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 cursor-pointer"
                                                        onClick={handleLogout}
                                                    >
                                                        Logout
                                                    </a>
                                                </Link>
                                            </li>
                                            {!isMobile && (
                                                <Link to="/">
                                                    <li>
                                                        <button
                                                            href="#"
                                                            className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                                                            onClick={handleLogout}
                                                        >
                                                            Logout
                                                        </button>
                                                    </li>
                                                </Link>
                                            )}
                                        </>
                                    )}
                                    {!isAuthenticated && (
                                        <li>
                                            <Link to="/login">
                                                <button
                                                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 cursor-pointer"
                                                    onClick={handleClickOption}
                                                >
                                                    Login
                                                </button>
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
