import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ResultsModal = ({ data }) => {
    const topThree = data.slice(0, 3);

    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <motion.div
            className="fixed z-10 inset-0 flex items-center justify-center backdrop-filter backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white rounded-lg p-6 w-full max-w-md"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                exit={{ y: -100 }}
                transition={{ delay: 0.2 }}
            >
                <motion.div
                    className="flex justify-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex justify-between w-44">
                        <motion.div
                            className="flex flex-col items-center w-24 h-24 bg-yellow-500 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="text-white text-lg font-bold">1</span>
                            <motion.img
                                className="w-16 h-16 rounded-full mt-2"
                                src={topThree[0].user.profileImage}
                                alt={topThree[0].user.firstName}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3 }}
                            />
                        </motion.div>
                        <motion.div
                            className="flex flex-col items-center w-16 h-16 bg-gray-300 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <span className="text-white text-lg font-bold">2</span>
                            <motion.img
                                className="w-12 h-12 rounded-full mt-1"
                                src={topThree[1].user.profileImage}
                                alt={topThree[1].user.firstName}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.4 }}
                            />
                        </motion.div>
                        <motion.div
                            className="flex flex-col items-center w-12 h-12 bg-gray-300 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <span className="text-white text-lg font-bold">3</span>
                            <motion.img
                                className="w-8 h-8 rounded-full mt-1"
                                src={topThree[2].user.profileImage}
                                alt={topThree[2].user.firstName}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
                <div className="grid gap-2">
                    {data.slice(3).map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="flex items-center justify-between"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                        >
                            <span className="text-gray-600">{index + 4}</span>
                            <motion.div className="flex items-center">
                                <motion.img
                                    className="w-8 h-8 rounded-full mr-2"
                                    src={item.user.profileImage}
                                    alt={item.user.firstName}
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                />
                                <div className="flex flex-col">
                                    <span className="text-gray-800">{item.user.firstName}</span>
                                    <span className="text-gray-500">{item.index}</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
                <button
                    className="mt-6 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    onClick={handleClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    Close
                </button>
            </motion.div>
            <motion.div
                className="absolute inset-0"
                style={{ pointerEvents: 'none' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.7 }}
            >
                {/* Add your confetti effect here */}
            </motion.div>
        </motion.div>
    );
};

export default ResultsModal;
