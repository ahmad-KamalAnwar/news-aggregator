import {
    LOGIN_SUCCESS,
    SIGNUP_SUCCESS,
    LOGOUT,
    AUTH_ERROR,
    ARTICLES_SUCCESS,
    PREFERENCES_SUCCESS
} from '../constants/types';

const initialState = {
      token: localStorage.getItem('token'),
      isAuthenticated: localStorage.getItem('token'),
      loading: localStorage.getItem('token') ? false : true,
      user: JSON.parse(localStorage.getItem('user')),
      error: null,
      articles: [],
      totalCounts: 0,
      currentPageNumber: 1,
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ARTICLES_SUCCESS:
            return {
              ...state,
              articles: payload.articles.data,
              totalCounts: payload.articles.total,
              currentPageNumber: payload.articles.current_page
            };
        case PREFERENCES_SUCCESS:
            return {
                ...state,
                preferences : payload.source
            };
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
