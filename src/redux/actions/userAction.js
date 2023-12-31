import axiosInstance from '../../api/axiosInstance';
import {AUTH_ERROR, ARTICLES_SUCCESS, PREFERENCES_SUCCESS} from '../constants/types';

export const getArticles = (filters) => async (dispatch) => {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    let url = `/api/article?page=${filters.nextPage}`;
    url += `${filters.sourceId !== '' ? `&sourceId=${filters.sourceId}` : ''}`;
    url += `${filters.categoryId !== '' ? `&categoryId=${filters.categoryId}` : ''}`;
    url += `${filters.fromDate !== '' ? `&fromDate=${filters.fromDate}` : ''}`;
    url += `${filters.toDate !== '' ? `&toDate=${filters.toDate}` : ''}`;

    try {
        const res = await axiosInstance.get(url);

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

export const getPreferences = () => async (dispatch) => {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

    try {
        const res = await axiosInstance.get(`/api/preferences`);

        if (res.status === 200) {
            dispatch({
                type: PREFERENCES_SUCCESS,
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
