import axiosInstance from '../../api/axiosInstance';
import { AUTH_ERROR, ARTICLES_SUCCESS } from '../constants/types';

export const userPreference = (filters) => async (dispatch) => {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

    try {
        const res = await axiosInstance.get(`/api/article?page=${filters.nextPage}${filters.sourceId !== '' ? `&sourceId=${filters.sourceId}` : ''}`);

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
