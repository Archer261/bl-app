import React, { useState } from 'react'


const WeignInInput = ({ participant, setFormState, formData }) => {

    const [editValue, setEditValue] = useState(false)

    const [weighIn, setWeighIn] = useState({
        user: participant.user._id,
        currentSize: 0,
        currentWeight: 0
    })

    const handleSizeChange = (e, participant) => {
        e.preventDefault();
        setWeighIn((weighIn) => ({
            ...weighIn,
            currentSize: e.target.value

        }));
    };

    const handleWeightChange = (e) => {
        e.preventDefault();
        setWeighIn((weighIn) => ({
            ...weighIn,
            currentWeight: e.target.value
        }))
    };

    const handleSave = (e) => {
        e.preventDefault();

        // Check if the weighIn.user already exists in formData.weighIns
        const userExistsIndex = formData.weighIns.findIndex((item) => item.user === weighIn.user);

        if (userExistsIndex !== -1) {
            // If the user exists, update the formData.weighIns array with the new weighIn
            setFormState((prevFormData) => ({
                ...prevFormData,
                weighIns: [
                    ...prevFormData.weighIns.slice(0, userExistsIndex),
                    weighIn,
                    ...prevFormData.weighIns.slice(userExistsIndex + 1),
                ],
            }));
        } else {
            // If the user doesn't exist, add the weighIn to formData.weighIns
            setFormState((prevFormData) => ({
                ...prevFormData,
                weighIns: [...prevFormData.weighIns, weighIn],
            }));
        }

        setEditValue(true);
    };

    const handleEdit = () => {
        if (editValue) {
            setEditValue(false);
        }
    };


    return (
        <>
            <div key={participant._id} className="flex items-center mb-4">
                <img
                    src={participant.user.profileImage}
                    alt={participant.user.firstName}
                    className="w-8 h-8 rounded-full mr-4"
                />
                <div>
                    <h3 className="text-lg font-semibold">{participant.user.firstName}</h3>
                    <div className="flex">
                        <div className="mr-4">
                            <label htmlFor={`weight_${participant._id}`} className="mr-2">
                                Weight:
                            </label>
                            <input
                                disabled={editValue}
                                readOnly={editValue}
                                type="input"
                                id={`weight_${participant._id}`}
                                name={`weight_${participant._id}`}
                                defaultValue={weighIn.currentWeight}
                                onChange={(e) => handleWeightChange(e, participant._id)}
                                className="border border-gray-300 rounded px-2 py-1"
                            />
                        </div>
                        {participant.startingSize && (
                            <div>
                                <label htmlFor={`size_${participant._id}`} className="mr-2">
                                    Size:
                                </label>
                                <input
                                    disabled={editValue}
                                    readOnly={editValue}
                                    type="input"
                                    id={`size_${participant._id}`}
                                    name={`size_${participant._id}`}
                                    defaultValue={weighIn.currentSize}
                                    onChange={(e) => handleSizeChange(e, participant._id)}
                                    className="border border-gray-300 rounded px-2 py-1"
                                />
                            </div>
                        )}
                        <div>
                            <button
                                className='btn btn-sm mx-1'
                                onClick={handleEdit}>
                                Edit
                            </button>
                        </div>
                        <div>
                            <button
                                className='btn btn-sm mx-1'
                                onClick={handleSave}>
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default WeignInInput