import axiosInstance from '../../api/axiosInstance';
import { AUTH_ERROR, ARTICLES_SUCCESS } from '../constants/types';

export const userPreference = (filters) => async (dispatch) => {
    try {
        const res = await axiosInstance.get(`/api/article?page=${filters.nextPage}`);

        if (res.status === 200) {
            dispatch({
                type: ARTICLES_SUCCESS,
                payload: res.data
            });
        }
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
            payload: err.response.data.message,
        });
    }
};
