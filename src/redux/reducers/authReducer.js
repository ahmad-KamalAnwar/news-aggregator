import { LOGIN_SUCCESS, SIGNUP_SUCCESS, LOGOUT, AUTH_ERROR } from '../constants/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: localStorage.getItem('token'),
  loading: localStorage.getItem('token') ? false : true,
  user: JSON.parse(localStorage.getItem('user')),
  error: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        success:payload.message,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      localStorage.setItem('user', JSON.stringify(payload.user));
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        success:payload.message,
        loading: false,
        user: payload.user,
        error: null,
      };
    case AUTH_ERROR:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        success: null,
        error: payload,
        success:false
      };
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        success: null,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
