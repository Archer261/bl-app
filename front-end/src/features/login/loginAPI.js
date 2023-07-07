// loginSlice.js (continued)

import { loginStart, loginSuccess, loginFailure } from './loginAPI';

export const login = (username, password) => async (dispatch) => {
  dispatch(loginStart());

  try {
    // Simulate an API call to login
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const user = await response.json();
      dispatch(loginSuccess(user));
    } else {
      const error = await response.text();
      dispatch(loginFailure(error));
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
