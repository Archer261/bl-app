import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../utils/AuthContext';
import axios from 'axios';

const CreateUser = () => {
    const [lastName, setLastName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isTest, setIsTest] = useState(false);

    const { token, user, isAuthenticated } = useContext(AuthContext);

    const handleAdminToggle = () => {
        setIsAdmin(!isAdmin);

    };
    const handleTestToggle = () => {
        setIsTest(!isTest);
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send login request to backend server
        axios
            .post('/api/login/signup', { username, password, firstName, lastName, email, isAdmin, profileImage })
            .then((response) => {
                navigate(`/users/${response.data.user.id}`)
                // Handle successful login
            })
            .catch((error) => {
                // Handle login error
                console.error(error);
            });
    };
    return (
        <section className="bg-white dark:bg-white rounded-lg h-full">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:gray-900">Create New User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        {user.isAdmin &&
                            <>
                                <div className="flex items-center">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value=""
                                            className="sr-only peer"
                                            checked={!isAdmin}
                                            onChange={handleAdminToggle}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-white peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Admin
                                        </span>
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value=""
                                            className="sr-only peer"
                                            checked={!isTest}
                                            onChange={handleTestToggle}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-white peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            Test
                                        </span>
                                    </label>
                                </div>
                            </>
                        }
                        <div className="sm:col-span-2">
                            <label for="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">First Name</label>
                            <input onChange={(e) => setFirstName(e.target.value)} type="text" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Bob" required="" />
                        </div>
                        <div className="sm:col-span-2">
                            <label for="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">Last Name</label>
                            <input onChange={(e) => setLastName(e.target.value)} type="text" name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Smith" required="" />
                        </div>
                        <div className="sm:col-span-2">
                            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">Username</label>
                            <input onChange={(e) => setUsername(e.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type username" required="" />
                        </div>
                        <div className="w-full">
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="example@example.com" required="" />
                        </div>
                        <div className="w-full">
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required="" />
                        </div>
                        <div className="sm:col-span-2">
                            <label for="profileImage" className="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">Profile Image</label>
                            <input onChange={(e) => setProfileImage(e.target.value)} type="text" name="profileImage" id="profileImage" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required="" />
                        </div>
                    </div>
                    <button type="submit" className=" bg-red-600 text-white inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center gray-900 bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-red-700">
                        Create User
                    </button>
                </form>
            </div>
        </section>
    );
};

export default CreateUser;