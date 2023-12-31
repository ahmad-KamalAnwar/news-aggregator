import axiosInstance from '../../api/axiosInstance';
import { LOGIN_SUCCESS, SIGNUP_SUCCESS, LOGOUT, AUTH_ERROR } from '../constants/types';

export const loginUser = (userData) => async (dispatch) => {
    try {
        const res = await axiosInstance.post('/api/login', userData);

        if (res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
        } else {
            dispatch({
                type: AUTH_ERROR,
                payload: 'Login failed. Please try again.',
            });
        }
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: err.response.data.message,
        });
    }
};

export const signupUser = (userData) => async (dispatch) => {
    try {
        const res = await axiosInstance.post('/api/register', userData);

        if (res.status === 201) {
            dispatch({
                  type: SIGNUP_SUCCESS,
                  payload: res.data,
            });
        } else {
          dispatch({
              type: AUTH_ERROR,
              payload: 'Signup failed. Please try again.',
          });
        }
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: err.response.data.message,
        });
    }
};

// Logout User
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
