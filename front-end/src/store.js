import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './features/login/loginSlice';

const store = configureStore({
    reducer: {
        login: loginReducer,
        // Other reducers...
    },
});

export default store;