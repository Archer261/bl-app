import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAxios from '../utils/useAxios';
import DateFormatted from '../utils/DateFormatted';
import { AuthContext } from '../utils/AuthContext';

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
                            className="bg-white block rounded-xl border border-gray-300 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <Link to={`/challenge/${c._id}`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-10 w-10 text-pink-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path
                                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                    />
                                </svg>

                                <h2 className="mt-4 text-xl font-bold">{c.name}</h2>

                                <div className="mt-1 text-sm">
                                    <DateFormatted dateValue={c.startDate} textValue={'Start Date: '} />
                                    <DateFormatted dateValue={c.endDate} textValue={'End Date: '} />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
                {user && (
                    user.isAdmin && (
                        <div className="mt-12 text-center">
                            <Link
                                to={'/create-challenge'}
                                className="inline-block rounded bg-pink-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring focus:ring-yellow-400"
                            >
                                New Challenge
                            </Link>
                        </div>
                    )
                )}
            </div>
        </section>
    );
};

export default Challenges;