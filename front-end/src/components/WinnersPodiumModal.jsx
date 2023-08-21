// WinnersPodiumModal.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

const WinnersPodiumModal = ({ isOpen, winnersOne, winnersTwo, onClose }) => {
    const [podiumVisible, setPodiumVisible] = useState(false);

    const top3RecordsOne = winnersOne.slice(0, 3);
    const top3RecordsTwo = winnersTwo.slice(0, 3);

    const swapPositions = (array, a, b, c) => {
        [array[a], array[b], array[c]] = [array[c], array[a], array[b]];
    };
    swapPositions(top3RecordsOne, 0, 1, 2);
    swapPositions(top3RecordsTwo, 0, 1, 2);

    const totalAnimationDuration = 0.5 * (top3RecordsOne.length - 1) + 0.5;

    useEffect(() => {
        if (isOpen) {
            const timeout = setTimeout(() => {
                setPodiumVisible(true);
            }, totalAnimationDuration * 1000); // Convert to milliseconds

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [isOpen, totalAnimationDuration]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900"
                    >
                        <div className="bg-red-600 w-1/3 h-auto p-8 rounded-lg shadow-lg mx-5">
                            <h2 className="text-white text-2xl font-bold mb-4 text-center">Results</h2>
                            <h3 className="text-white text-lg font-bold mb-4 text-center">Weight Challenge</h3>
                            <div className="flex justify-center pt-10 space-x-4">
                                {top3RecordsOne.map((winner, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 100 }} // Initial animation properties
                                        animate={podiumVisible ? { opacity: 1, y: 0 } : {}} // Animate properties
                                        exit={{ opacity: 0, y: 100 }} // Exit animation properties
                                        transition={{ duration: 0.5, delay: (index === 1 ? 3 : index === 0 ? 1 : 2) * 0.5 }} // Adjust delay duration
                                        className={`flex flex-col items-center w-50 ${index === 1 ? '-translate-y-4' : index === 0 ? 'translate-y-4' : ''
                                            }`}
                                    >
                                        <div
                                            className={`rounded-full text-white bg-red-600 w-full h-auto flex items-center justify-center ${index === 1 ? '-mt-12' : index === 2 ? 'flex-auto'
                                                : ''}`}
                                        >
                                            <img
                                                src={winner.user.profileImage}
                                                className="rounded-full border-white border-4 h-full w-full"
                                                alt={`Winner ${index}`}
                                            />
                                        </div>
                                        <p className="mt-2 text-white">
                                            {index === 0 ? '3rd' : index === 1 ? '1st' : '2nd'}
                                        </p>
                                        <p className="mt-2 text-white">{winner.user.firstName}</p>
                                        <p className="mt-2 text-white">{winner.weightPercentChange}%</p>
                                    </motion.div>
                                ))}
                            </div>
                            {/* <div className="flex justify-center">
                                <button
                                    onClick={onClose}
                                    className="bg-white text-red-600 hover:text-white px-4 py-2 rounded mt-8 hover:bg-red-600 transition-colors"
                                >
                                    Close
                                </button>
                            </div> */}
                        </div>
                        <div className="bg-red-600 w-1/3 h-auto p-8 rounded-lg shadow-lg mx-5">
                            <h2 className="text-white text-2xl font-bold mb-4 text-center">Results</h2>
                            <h3 className="text-white text-lg font-bold mb-4 text-center">Weight Challenge</h3>
                            <div className="flex justify-center pt-10 space-x-4">
                                {top3RecordsTwo.map((winner, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 100 }} // Initial animation properties
                                        animate={podiumVisible ? { opacity: 1, y: 0 } : {}} // Animate properties
                                        exit={{ opacity: 0, y: 100 }} // Exit animation properties
                                        transition={{ duration: 0.5, delay: (index === 1 ? 3 : index === 0 ? 1 : 2) * 0.5 }} // Adjust delay duration
                                        className={`flex flex-col items-center w-50 ${index === 1 ? '-translate-y-4' : index === 0 ? 'translate-y-4' : ''
                                            }`}
                                    >
                                        <div
                                            className={`rounded-full text-white bg-red-600 w-full h-auto flex items-center justify-center ${index === 1 ? '-mt-12' : index === 2 ? 'flex-auto'
                                                : ''}`}
                                        >
                                            <img
                                                src={winner.user.profileImage}
                                                className="rounded-full border-white border-4 h-full w-full"
                                                alt={`Winner ${index}`}
                                            />
                                        </div>
                                        <p className="mt-2 text-white">
                                            {index === 0 ? '3rd' : index === 1 ? '1st' : '2nd'}
                                        </p>
                                        <p className="mt-2 text-white">{winner.user.firstName}</p>
                                        <p className="mt-2 text-white">{winner.sizePercentChange}%</p>
                                    </motion.div>
                                ))}
                            </div>
                            {/* <div className="flex justify-center">
                                <button
                                    onClick={onClose}
                                    className="bg-white text-red-600 hover:text-white px-4 py-2 rounded mt-8 hover:bg-red-600 transition-colors"
                                >
                                    Close
                                </button>
                            </div> */}
                        </div>
                        <div className="relative right-20 bottom-60 justify-center">
                            <button
                                onClick={onClose}
                                className="bg-white text-red-600 hover:text-white px-4 py-2 rounded mt-8 hover:bg-red-600 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                    {podiumVisible && (
                        <Confetti
                            width={window.innerWidth}
                            height={window.innerHeight}
                            recycle={false}
                            numberOfPieces={200}
                            run={true}
                        />
                    )}
                </>
            )}
        </AnimatePresence>
    );
};

export default WinnersPodiumModal;