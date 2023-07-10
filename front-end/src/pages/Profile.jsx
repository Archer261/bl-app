import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router";
import { AuthContext } from '../utils/AuthContext';
import useAxios from "../utils/useAxios";

const Profile = () => {
    const [isButtonClicked, setButtonClicked] = useState(false);
    const [isMe, setIsMe] = useState(false);

    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        checkUser();

        return () => {

        }
    }, [location])

    const checkUser = () => {
        if (id === user.id) {
            setIsMe(true);
        } else {
            setIsMe(false);
        }
    }

    const { data, loading, error } = useAxios(`/api/users/${id}`);

    if (loading) {
        return <span className="loading loading-spinner text-error"></span>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleButtonClick = () => {
        setButtonClicked(true);
        setTimeout(() => {
            setButtonClicked(false);
        }, 2000);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="bg-white rounded-lg shadow-lg">
                <div className="flex justify-between items-center px-8 py-6 border-b">
                    <h1 className="text-2xl font-bold">Profile</h1>
                    {isMe &&
                        <button
                            className={`bg-red-600 hover:bg-red-800 text-white font-bold px-4 py-2 rounded ${isButtonClicked ? 'cursor-default' : 'cursor-pointer'
                                }`}
                            onClick={handleButtonClick}
                            disabled={isButtonClicked}
                        >
                            {isButtonClicked ? 'Coming soon...' : 'Edit Profile'}
                        </button>
                    }
                </div>
                <div className="flex flex-col md:flex-row p-8">
                    <div className="w-full md:w-1/4">
                        <img src={data.profileImage} alt="Profile" className="w-full rounded-lg" />
                    </div>
                    <div className="w-full md:w-3/4 md:pl-8 mt-8 md:mt-0">
                        <h2 className="text-xl font-bold mb-4">{data.firstName} {data.lastName}</h2>
                        {/* <p className="text-gray-600">Software Developer</p> */}
                        <div className="flex items-center mt-4">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.5 10a.5.5 0 000 1h9a.5.5 0 000-1h-9z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-600">San Francisco, CA</span> */}
                        </div>
                        <div className="flex items-center mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.5 10a.5.5 0 000 1h9a.5.5 0 000-1h-9z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-600">{data.email}</span>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-4">About Me</h3>
                            <p className="text-gray-600">...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
