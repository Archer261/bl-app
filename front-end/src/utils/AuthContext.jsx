import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ErrorPopup } from '../components';

const AuthContext = createContext();

const AuthProvider = ({ children, initialToken }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [token, setToken] = useState(initialToken || '');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [error, setError] = useState(null);

    const login = (response) => {

        const { token, user, error } = response.data;

        if (token && user) {
            // Store the token and user data in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Update the state values in the AuthContext
            setToken(token);
            setUser(user);
        } else {
            setError(error);

        }
    };

    const signup = (response) => {
        console.log(response);
        const { token, user, error } = response.data;

        if (token && user) {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            setToken(token);
            setUser(user);

            navigate('/'); // Redirect to home page after successful signup
        } else {
            setError(error);
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
        console.log(location.pathname)
        if (!isAuthenticated) {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
                const storedUser = JSON.parse(localStorage.getItem('user'));
                setUser(storedUser);
            } else {
                if (location.pathname !== '/signup' && !location.pathname.startsWith('/challenge')) {

                    navigate('/login'); // Redirect to the login page if not authenticated and no stored token
                }
            }
        }
    }, [isAuthenticated, navigate, location.pathname]);

    const authContextValue = {
        user,
        token,
        login,
        logout,
        signup,
        isAuthenticated,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
