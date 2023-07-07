import React, { useContext } from 'react'
import { NotificationBell } from '../index';
import { AuthContext } from '../../utils/AuthContext';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {

    const { isAuthenticated, logout, user } = useContext(AuthContext);

    const handleLogout = () => {
        logout(); // Call the logout function when the logout button is clicked
    };

    const unreadNotificationCount = 3; // Example count
    return (
        <header className="bg-white">
            <div
                className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
            >
                <Link to={'/'}> <div className="text-black font-bold text-xl max-w-sm">
                    <motion.div
                        whileTap={{ scale: 0.9 }} // Shrinks on click
                        whileHover={{ scale: 1.02 }} // Grows on hover
                    >
                        <img className='w-10' src={logo} />
                    </motion.div>
                </div></Link>

                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global" className="hidden md:block">
                        {isAuthenticated && (
                            <>
                                <ul className="flex items-center gap-6 text-sm">
                                    <li>
                                        <Link to={'/challenge'}>
                                            <a className="text-gray-500 transition hover:text-gray-500/75" >
                                                My Challenges
                                            </a>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to={'/challenge'}>
                                            <a className="text-gray-500 transition hover:text-gray-500/75">
                                                All Challenges
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </>
                        )}
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            {isAuthenticated && (
                                <>
                                    <Link to={`/users/${user.id}`} className="block shrink-0">
                                        <span className="sr-only">Profile</span>
                                        <img
                                            alt="Profile"
                                            src={user.profileImage}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    </Link>
                                    <a
                                        className="block rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 cursor-pointer"
                                        onClick={handleLogout} // Call handleLogout function on button click
                                    >
                                        Logout
                                    </a>
                                </>
                            )}
                        </div>

                        <button
                            className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
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
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
        // <header className="bg-gray-50">
        //     <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        //         <div className="flex items-center justify-end gap-4">

        //             <Navbar />
        //             {isAuthenticated && (
        //                 <>
        //                     <div className="flex items-center gap-4">
        //                         <a
        //                             href="#"
        //                             className="block shrink-0 rounded-full bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700"
        //                         >
        //                             <span className="sr-only">Notifications</span>
        //                             <svg
        //                                 xmlns="http://www.w3.org/2000/svg"
        //                                 className="h-5 w-5"
        //                                 fill="none"
        //                                 viewBox="0 0 24 24"
        //                                 stroke="currentColor"
        //                                 strokeWidth="2"
        //                             >
        //                                 <path
        //                                     strokeLinecap="round"
        //                                     strokeLinejoin="round"
        //                                     d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        //                                 />
        //                             </svg>
        //                         </a>
        //                     </div>

        //                     <span
        //                         aria-hidden="true"
        //                         className="block h-6 w-px rounded-full bg-gray-200"
        //                     ></span>

        //                     <Link to={`/users/${user.id}`}><a className="block shrink-0">
        //                         <span className="sr-only">Profile</span>
        //                         <img
        //                             alt="Man"
        //                             src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        //                             className="h-10 w-10 rounded-full object-cover"
        //                         />
        //                     </a></Link>
        //                 </>
        //             )}
        //         </div>


        //     </div>
        // </header>
    )
}

export default Header