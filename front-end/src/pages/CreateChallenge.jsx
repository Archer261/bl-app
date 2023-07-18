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
    const [organizer, setOrganizer] = useState(false);

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

    const handleParticipantSelection = (event) => {
        const selectedUserId = event.target.value;
        const selectedUser = users.find(user => user._id === selectedUserId);
        setSelectedUser(selectedUser);
        addToSelected(selectedUser);

    };

    const handleOrganizerSelection = (event) => {
        const selectedUserId = event.target.value;
        const selectedUser = users.find(user => user._id === selectedUserId);
        setSelectedUser(selectedUser);
        setOrganizer(selectedUser);

    };

    const addToSelected = (option) => {

        const selectedOption = users.find(u => u._id === option._id)
        setSelectedOptions([...selectedOptions, selectedOption]);
        setParticipants([...participants, { _id: option._id, buyInStatus: false }])
    };


    const handleRemove = (id) => {
        const selectedOption = selectedOptions.filter(item => item._id !== id)
        //setSelectedOptions(selectedOption);
    }


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
        <section className="bg-white dark:bg-white rounded-lg">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:gray-900">Create New Challenge</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

                        <div className="flex items-center">
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

                        <div className="sm:col-span-2">
                            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">Challenge Name</label>
                            <input onChange={(e) => setChallengeName(e.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type challenge name" required="" />
                        </div>

                        <div>
                            <label for="organizer" className="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">Organizer</label>
                            <select
                                value={selectedUser}
                                onChange={handleOrganizerSelection}
                                disabled={isLoading}
                                id="organizer"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                <option selected="">Select Organizer</option>
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

                        <div className="w-full">
                            <label for="startDate" className="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">Start Date</label>
                            <input onChange={(e) => setStartDate(e.target.value)} type="date" name="startDate" id="startDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Challenge start date" required="" />
                        </div>
                        <div>
                            <label for="endDate" className="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">End Date</label>
                            <input onChange={(e) => setEndDate(e.target.value)} type="date" name="endDate" id="endDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Challenge end date" required="" />
                        </div>

                        <div>
                            <label for="participants" className="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">Participants</label>
                            <select
                                value={selectedUser}
                                onChange={handleParticipantSelection}
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
                        <div className="w-full">
                            <label for="buyIn" className="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">Buy-in</label>
                            <input onChange={(e) => setBuyIn(e.target.value)} type="number" name="buyIn" id="buyIn" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$10" required="" />
                        </div>

                        {selectedOptions && (
                            <div className="w-full col-span-2 container flex flex-wrap sm:col-span-3">
                                {
                                    selectedOptions.map((p) => (
                                        <>
                                            <div className="max-w-xs px-3 py-3 lg:max-w-lg">
                                                <div className="bg-white shadow-xl rounded-lg py-3">
                                                    <div className="photo-wrapper p-2">
                                                        <img className="w-auto max-h-24 rounded-full mx-auto" src={p.profileImage} alt={p.firstName} />
                                                    </div>
                                                    <div className="p-2">
                                                        <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{p.firstName} {p.lastName}</h3>
                                                        <div className="text-center text-gray-400 text-xs font-semibold">
                                                            <p></p>
                                                        </div>
                                                        <table className="text-xs my-1">
                                                            <tbody>
                                                                <tr>
                                                                    <td className="px-2 py-1 text-gray-500 font-semibold">Email</td>
                                                                    <td className="px-2 py-1">{p.email}</td>
                                                                </tr>
                                                            </tbody></table>

                                                        <div className="text-center my-3">
                                                            <button
                                                                type='button'
                                                                onClick={handleRemove(p._id)}
                                                                className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium">Remove
                                                            </button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        </>
                                    )
                                    )
                                }</div>

                        )}

                        {/* <div className="sm:col-span-2">
                            <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:gray-900">Selected Participants</label>
                            <textarea value={selectedOptions} id="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=""></textarea>
                        </div> */}
                    </div>
                    <button type="submit" className=" bg-red-700 text-white inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center gray-900 bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Create Challenge
                    </button>
                </form>
            </div>
        </section>
    );
};

export default CreateChallenge;