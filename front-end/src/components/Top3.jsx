import React from 'react';
import { motion } from 'framer-motion';
import { first, second, third } from '../assets';

const Top3 = ({ title }) => {
    const imageVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    return (
        <>
            <section>
                <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-8 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center max-w-full text-gray-900 font-extrabold text-lg"
                        variants={fadeInVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.2 }}
                    >
                        <h1>{title}</h1>
                    </motion.div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">

                        <div className="lg:col-span-3 lg:py-4">
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <li className="w-full">
                                    <motion.div
                                        variants={imageVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ duration: 0.5, delay: 0.4 }}


                                    >
                                        <a href="#" className="block group">
                                            <img
                                                src={second}
                                                alt=""
                                                className="object-cover w-full rounded aspect-square"
                                            />

                                            <div className="mt-3">
                                                <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                                                    {/* Add content */}
                                                </h3>


                                            </div>
                                        </a>
                                    </motion.div>
                                </li>
                                <li className="w-full">
                                    <motion.div
                                        variants={imageVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ duration: 0.5, delay: 0.6 }}


                                    >
                                        <a href="#" className="block group">
                                            <img
                                                src={first}
                                                alt=""
                                                className="object-cover w-full rounded aspect-square"
                                            />

                                            <div className="mt-3">
                                                <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                                                    {/* Add content */}
                                                </h3>


                                            </div>
                                        </a>
                                    </motion.div>
                                </li>

                                <li className="w-full">
                                    <motion.div
                                        variants={imageVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ duration: 0.5, delay: 0.2 }}

                                    >
                                        <a href="#" className="block group">
                                            <img
                                                src={third}
                                                alt=""
                                                className="object-cover w-full rounded aspect-square"
                                            />

                                            <div className="mt-3">


                                            </div>
                                        </a>
                                    </motion.div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Top3;
