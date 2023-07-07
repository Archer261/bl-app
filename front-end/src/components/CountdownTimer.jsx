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
                setCountdownText('Challenge ended');
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
            <div className="flex justify-center items-center">
                <div className="text-center">
                    <p className="text-lg">...Loading Timer</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center">
            <div className="text-center">
                {remainingTime > 0 ? (
                    <>
                        <p className="text-3xl font-semibold">{countdownText}</p>
                        <p className="text-lg">{formatTime(remainingTime)}</p>
                        {currentWeek > 0 && <p className="text-lg">Week: {currentWeek}</p>}
                    </>
                ) : (
                    <p className="text-3xl font-semibold">{countdownText}</p>
                )}
            </div>
        </div>
    );
};

export default CountdownTimer;
