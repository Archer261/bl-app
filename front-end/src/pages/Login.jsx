import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext, AuthProvider } from '../utils/AuthContext';
import { ErrorPopup } from '../components';


const LoginPage = () => {

    const { token, login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        if (!token && location.pathname !== '/signup' || !location.pathname.startsWith('/challenge')) {
            // Redirect the user to the login page or any other appropriate action
            navigate('/login');
        } else {
            navigate('/');
        }
    }, [token, navigate]);

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const credentials = {
            usernameOrEmail,
            password,
        };

        // Send login request to backend server
        axios
            .post('/api/login', credentials)
            .then((response) => {
                login(response);
                // Handle successful login

            })
            .catch((error) => {
                // Handle login error
                console.error(error);
                setAuthError(error);
            });

        setPassword('');
    };

    return (
        <div className="container flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <a className="font-medium text-white hover:text-red-700">
                        sign up if you're not a member
                    </a>
                    {/* <Link to="/signup" className="font-medium text-white hover:text-red-700">
                        sign up if you're not a member
                    </Link> */}
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-700">
                                Username or Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="usernameOrEmail"
                                    name="usernameOrEmail"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    value={usernameOrEmail}
                                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="/forgot-password" className="font-medium text-red-600 hover:text-red-500">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                </div>
            </div>

        </div>
    );
};

export default LoginPage;