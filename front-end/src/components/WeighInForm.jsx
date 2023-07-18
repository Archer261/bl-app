import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { WeighInInput } from '../components';
import PropTypes from 'prop-types';

const WeighInForm = ({ participants, onClose, challengeId }) => {
    // Create state for individual weigh-ins
    const [formData, setFormData] = useState({
        challengeId: challengeId,
        weighIns: []
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send login request to backend server
        axios
            .post('/api/weighIn', formData)
            .then((response) => {

                // Handle successful login

            })
            .catch((error) => {
                // Handle login error
                console.error(error);
            });

    };

    const handleClose = () => {
        setWeighInData({});
        onClose();
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Weigh-In Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {participants.map((participant) => (
                        <WeighInInput participant={participant} setFormState={setFormData} formData={formData} />
                    ))}
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

WeighInForm.propTypes = {
    participants: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            withSize: PropTypes.bool,
            user: PropTypes.shape({
                firstName: PropTypes.string,
                profileImage: PropTypes.string,
            }),
            startingWeight: PropTypes.number,
            startingSize: PropTypes.number,
        })
    ).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default WeighInForm;
