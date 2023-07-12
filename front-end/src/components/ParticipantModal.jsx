import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ParticipantModal = ({ challengeId, participant, onClose }) => {
    const [startingWeight, setStartingWeight] = useState('');
    const [startingSize, setStartingSize] = useState('');
    const [buyIn, setBuyIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [participantData, setParticipantData] = useState(null);

    useEffect(() => {
        const fetchParticipantData = async () => {
            try {
                const response = await axios.get(`/api/challenge/${challengeId}/participants/${participant}`);
                setParticipantData(response.data);
                setStartingWeight(response.data.participant.startingWeight);
                setStartingSize(response.data.participant.startingSize);
                setBuyIn(response.data.participant.buyInStatus);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchParticipantData();

    }, [challengeId, participant]);

    const handleSave = async () => {
        try {
            // Perform your Axios request to save the updated data
            await axios.put(`/api/challenge/${challengeId}/participants/${participant}`, {
                startingWeight,
                startingSize,
                buyIn,
            });

            // Close the modal after successful save
            onClose();
        } catch (error) {
            console.error('Error saving participant data:', error);
        }
    };

    if (loading) {
        return <span className="loading loading-spinner text-error"></span>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="container flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg">
                        <button
                            className="relative top-0 right-0 text-gray-500 hover:text-gray-800"
                            onClick={onClose}
                        >
                            X
                        </button>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Edit {participantData.participant.user.firstName}
                        </h2>
                        <div>
                            <label htmlFor="startingWeight" className="block text-sm font-medium text-gray-700">
                                Starting Weight
                            </label>
                            <div className="mt-1">
                                <input
                                    id="startingWeight"
                                    name="startingWeight"
                                    type="number"
                                    step="0.01"
                                    required
                                    value={startingWeight}
                                    onChange={(e) => setStartingWeight(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="startingSize" className="block text-sm font-medium text-gray-700">
                                Starting Size
                            </label>
                            <div className="mt-1">
                                <input
                                    id="startingSize"
                                    name="startingSize"
                                    type="number"
                                    step="0.01"
                                    required
                                    value={startingSize}
                                    onChange={(e) => setStartingSize(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="buyIn" className="block text-sm font-medium text-gray-700">
                                Buy-In
                            </label>
                            <div className="mt-1">
                                <input
                                    id="buyIn"
                                    name="buyIn"
                                    type="checkbox"
                                    checked={buyIn}
                                    onChange={(e) => setBuyIn(e.target.checked)}
                                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                type="button"
                                className="inline-flex justify-center py-2 px-4 mx-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="inline-flex justify-center py-2 px-4 mx-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParticipantModal;
