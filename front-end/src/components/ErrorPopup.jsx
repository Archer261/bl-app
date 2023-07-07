import React, { useState, useEffect } from 'react';

const ErrorPopup = ({ message }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className={`fixed top-0 left-0 right-0 flex items-center justify-center z-50 ${visible ? '' : 'hidden'}`}>
            <div className={`bg-red-500 text-white rounded-md py-2 px-4 ${visible ? 'opacity-100' : 'opacity-0'}`}>
                {message.response.data.error}
            </div>
        </div>
    );
};

export default ErrorPopup;
