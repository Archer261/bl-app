import React, { useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from '../utils/AuthContext';
import useAxios from "../utils/useAxios";

const Profile = () => {

    const { id } = useParams();

    const { data, loading, error } = useAxios(`/api/users/${id}`);

    if (loading) {
        return <span className="loading loading-spinner text-error"></span>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="bg-gray-100 max-h-screen">
            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="flex">
                        <div className="w-1/2">
                            <img
                                src="http://via.placeholder.com/640x360"
                                alt="Profile"
                                className="object-cover w-full"
                            />
                        </div>
                        <div className="w-1/2 px-6 py-8">
                            <h2 className="text-3xl font-bold mb-4">{data.firstName} {data.lastName}</h2>
                            <p className="text-gray-600 text-lg mb-4">
                                Email:
                            </p>
                            {/* <p className="text-gray-600 text-lg mb-4">
                                Team: {profile.team}
                            </p>
                            <p className="text-gray-600 text-lg mb-4">
                                Number: {profile.number}
                            </p>
                            <p className="text-gray-600 text-lg mb-4">
                                Height: {profile.height}
                            </p>
                            <p className="text-gray-600 text-lg mb-4">
                                Weight: {profile.weight}
                            </p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
