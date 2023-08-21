import React, { useState } from 'react';

const defaultChallenge = {
    name: null,
    startDate: null,
    endDate: null,
    buyIn: null,
    withSize: null,
    participants: [],
    // Add other fields here, according to your model
};

const ChallengeModal = ({ challenge = defaultChallenge, isOpen, onClose, onSave }) => {
    const [updatedChallenge, setUpdatedChallenge] = useState(challenge);
    const [newParticipant, setNewParticipant] = useState('');
    const [participantsError, setParticipantsError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedChallenge((prevChallenge) => ({
            ...prevChallenge,
            [name]: value,
        }));
    };

    const handleAddParticipant = () => {
        if (newParticipant.trim() === '') {
            setParticipantsError('Please enter a participant name.');
        } else {
            setUpdatedChallenge((prevChallenge) => ({
                ...prevChallenge,
                participants: [...prevChallenge.participants, newParticipant.trim()],
            }));
            setNewParticipant('');
            setParticipantsError('');
        }
    };

    const handleRemoveParticipant = (participant) => {
        setUpdatedChallenge((prevChallenge) => ({
            ...prevChallenge,
            participants: prevChallenge.participants.filter((p) => p !== participant),
        }));
    };

    const handleSave = () => {
        onSave(updatedChallenge);
        onClose();
    };

    return (
        <div
            className={`${isOpen ? 'fixed' : 'hidden'
                } inset-0 flex items-center justify-center z-10`}
        >
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="bg-white rounded-lg p-4 z-10">
                <div className="text-xl font-bold mb-4">Edit Challenge</div>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={updatedChallenge.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={updatedChallenge.startDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {/* Add other fields here, according to your model */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="participants">
                            Participants
                        </label>
                        {updatedChallenge.participants.map((participant, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={participant}
                                    onChange={(e) => {
                                        const updatedParticipants = [...updatedChallenge.participants];
                                        updatedParticipants[index] = e.target.value;
                                        setUpdatedChallenge((prevChallenge) => ({
                                            ...prevChallenge,
                                            participants: updatedParticipants,
                                        }));
                                    }}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    className="px-2 py-1 ml-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    onClick={() => handleRemoveParticipant(participant)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <div className="flex items-center mb-2">
                            <input
                                type="text"
                                value={newParticipant}
                                onChange={(e) => setNewParticipant(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                            <button
                                type="button"
                                className="px-2 py-1 ml-2 bg-green-500 text-white rounded hover:bg-green-600"
                                onClick={handleAddParticipant}
                            >
                                Add
                            </button>
                        </div>
                        {participantsError && <div className="text-red-500">{participantsError}</div>}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChallengeModal;
