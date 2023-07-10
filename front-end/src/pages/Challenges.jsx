import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAxios from '../utils/useAxios';
import DateFormatted from '../utils/DateFormatted';
import { AuthContext } from '../utils/AuthContext';
import { logo, base } from '../assets';

const Challenges = () => {
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const { data, loading, error } = useAxios('/api/challenge');

    if (loading) {
        return <span className="loading loading-spinner text-error"></span>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <section className="text-gray-900">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
                <div className="mx-auto max-w-lg text-center">
                    <h2 className="text-3xl font-bold sm:text-4xl">Challenge List</h2>
                    <p className="mt-4">View all challenges.</p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((c, index) => (
                        <motion.div
                            key={c._id}
                            className="overflow-hidden rounded-lg shadow transition hover:shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <Link to={`/challenge/${c._id}`}>
                                <img
                                    alt="Office"
                                    src={base}
                                    className="h-56 w-full object-cover"
                                />

                                <div className="bg-white p-4 sm:p-6">
                                    <h3 className="mt-0.5 text-2xl text-gray-900">
                                        {c.name}
                                    </h3>

                                    <DateFormatted dateValue={c.startDate} textValue={'Start Date: '} />
                                    <DateFormatted dateValue={c.endDate} textValue={'End Date: '} />


                                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                                        {/* Organizer: {c.organizer} */}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
                {user && (
                    user.isAdmin && (
                        <div className="card-actions justify-center">
                            <Link to={`/create-challenge`}><button className="btn btn-secondary">Create New Challenge</button></Link>
                        </div>
                    )
                )}
            </div>
        </section>
    );
};

export default Challenges;