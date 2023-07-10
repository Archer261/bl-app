import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../utils/AuthContext';
import axios from 'axios';

const CreateChallenge = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [participants, setParticipants] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [challengeName, setChallengeName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [buyIn, setBuyIn] = useState('');
    const [withSize, setWithSize] = useState(false);

    const { user } = useContext(AuthContext);

    const handleToggle = () => {
        setWithSize(!withSize);
    };

    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users'); // Replace with your API endpoint to fetch users
            setUsers(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleUserSelection = (event) => {
        const selectedUserId = event.target.value;
        const selectedUser = users.find(user => user._id === selectedUserId);
        setSelectedUser(selectedUser);
        addToSelected(selectedUser);

    };

    const addToSelected = (option) => {
        setSelectedOptions([...selectedOptions, option.name]);
        setParticipants([...participants, { _id: option._id, buyInStatus: false }])

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send login request to backend server
        axios
            .post('/api/challenge', { user: user, name: challengeName, startDate, endDate, buyIn, withSize, participants: participants, orgainzer: user })
            .then((response) => {
                navigate(`/challenge/${response.data._id}`)
                // Handle successful login

            })
            .catch((error) => {
                // Handle login error
                console.error(error);
            });
    };

    const handleWithSize = (e) => {
        if (e.target.value === 'on') {

            setWithSize(true);

        } else {
            setWithSize(false);

        }


    }
    return (
        <section class="bg-white dark:bg-white rounded-lg">
            <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 class="mb-4 text-xl font-bold text-gray-900 dark:gray-900">Create New Challenge</h2>
                <form onSubmit={handleSubmit}>
                    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">

                        <div class="flex items-center">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    value=""
                                    className="sr-only peer"
                                    checked={!withSize}
                                    onChange={handleToggle}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-white peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Include Size Challenge
                                </span>
                            </label>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">Challenge Name</label>
                            <input onChange={(e) => setChallengeName(e.target.value)} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type challenge name" required="" />
                        </div>
                        <div class="w-full">
                            <label for="startDate" class="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">Start Date</label>
                            <input onChange={(e) => setStartDate(e.target.value)} type="date" name="startDate" id="startDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Challenge start date" required="" />
                        </div>
                        <div>
                            <label for="endDate" class="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">End Date</label>
                            <input onChange={(e) => setEndDate(e.target.value)} type="date" name="endDate" id="endDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Challenge end date" required="" />
                        </div>

                        <div>
                            <label for="participants" class="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">Participants</label>
                            <select
                                value={selectedUser}
                                onChange={handleUserSelection}
                                disabled={isLoading}
                                id="participants"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                <option selected="">Select Participants</option>
                                {isLoading ? (
                                    <option value="" disabled>Loading...</option>
                                ) : (
                                    users.map((user) => (
                                        <option key={user._id} value={user._id}>
                                            {user.username}
                                        </option>
                                    ))
                                )}
                            </select>

                        </div>
                        <div class="w-full">
                            <label for="buyIn" class="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">Buy-in</label>
                            <input onChange={(e) => setBuyIn(e.target.value)} type="number" name="buyIn" id="buyIn" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$10" required="" />
                        </div>

                        <div class="sm:col-span-2">
                            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">Selected Participants</label>
                            <textarea value={selectedOptions} id="description" rows="8" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=""></textarea>
                        </div>
                    </div>
                    <button type="submit" class=" bg-red-700 text-white inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center gray-900 bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Create Challenge
                    </button>
                </form>
            </div>
        </section>
    );
};

export default CreateChallenge;