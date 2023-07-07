import React, { createContext, useState, useEffect } from 'react';
import { Popup } from '../components';

const PopupContext = createContext();

const PopupProvider = ({ children }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    useEffect(() => {
        let timer;
        if (showPopup) {
            timer = setTimeout(() => {
                setShowPopup(false);
            }, 3000);
        }

        return () => clearTimeout(timer);
    }, [showPopup]);

    const showPopupMessage = (message) => {
        setPopupMessage(message);
        setShowPopup(true);
    };

    return (
        <PopupContext.Provider value={{ showPopupMessage }}>
            {children}
            {showPopup && <Popup message={popupMessage} />}
        </PopupContext.Provider>
    );
};

export { PopupContext, PopupProvider };
