import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ startDateTime, endDateTime }) => {
    const [remainingTime, setRemainingTime] = useState(0);
    const [countdownText, setCountdownText] = useState('');
    const [currentWeek, setCurrentWeek] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Added isLoading state

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            const remaining = Math.max(0, endDateTime - currentTime);
            setRemainingTime(remaining);

            if (currentTime < startDateTime) {
                setCountdownText('Challenge starting in');
                setCurrentWeek(0);
                setIsLoading(false); // Set isLoading to false when the necessary fields are populated
            } else if (currentTime > endDateTime) {
                setCountdownText('Challenge Complete!');
                setCurrentWeek(0);
                setIsLoading(false); // Set isLoading to false when the necessary fields are populated
            } else {
                setCountdownText('Countdown');
                const weeks = Math.ceil((currentTime - startDateTime) / (7 * 24 * 60 * 60 * 1000));
                setCurrentWeek(weeks);
                setIsLoading(false); // Set isLoading to false when the necessary fields are populated
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [startDateTime, endDateTime]);

    const formatTime = (time) => {
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const days = Math.floor(time / (1000 * 60 * 60 * 24));

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    if (isLoading) {
        return (
            <div className="flex-1 justify-center items-center">
                <div className="text-center">
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            </div>
        )
    }

    return (
        // <div className="flex-1 justify-center items-center">
        //     <div className="text-center">
        //         {remainingTime > 0 ? (
        //             <>
        //                 <p className="text-3xl font-semibold">{countdownText}</p>
        //                 <p className="text-lg">{formatTime(remainingTime)}</p>
        //                 {currentWeek > 0 && <p className="text-lg">Week: {currentWeek}</p>}
        //             </>
        //         ) : (
        //             <p className="text-3xl font-semibold">{countdownText}</p>
        //         )}
        //     </div>
        // </div>
        <div
            className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800"
        >
            <div className="p-4 flex items-center">
                <div
                    className="p-3 rounded-full text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500 mr-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16"> <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" /> </svg>
                </div>
                <div>
                    <p className="mb-2 text-sm font-medium text-white dark:text-white">
                        Weigh In Week
                    </p>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        {countdownText}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;
