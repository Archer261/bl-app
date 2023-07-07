import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PopupContext } from './PopupContext'

const AuthContext = createContext();

const AuthProvider = ({ children, initialToken }) => {
    const navigate = useNavigate();

    const [token, setToken] = useState(initialToken || '');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    const login = (response) => {
        console.log(response)
        const { token, user } = response.data; // Assuming the token and user are present in the response data
        console.log(user);
        if (token && user) {
            // Store the token and user data in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Update the state values in the AuthContext
            setToken(token);
            setUser(user);


        } else {

        }
    };

    const signup = (response) => {

        console.log(response);
        const { token, user } = response.data;


        if (token && newUser) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            setToken(token);
            setUser(user);


            navigate('/'); // Redirect to home page after successful signup

        } else {

        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken('');
        setUser(null);
        navigate('/login');
    };

    const isAuthenticated = !!token;

    useEffect(() => {
        // Check if the user is authenticated on component mount
        if (!isAuthenticated) {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
                const storedUser = JSON.parse(localStorage.getItem('user'));
                setUser(storedUser);
            } else {
                if (location.pathname !== '/signup') {
                    navigate('/login'); // Redirect to the login page if not authenticated and no stored token
                }
            }
        }
    }, [isAuthenticated, navigate]);

    const authContextValue = {
        user,
        token,
        login,
        logout,
        signup,
        isAuthenticated,
    };

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
