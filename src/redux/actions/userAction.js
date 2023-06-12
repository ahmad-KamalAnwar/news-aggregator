import axiosInstance from '../../api/axiosInstance';
import { AUTH_ERROR, ARTICLES_SUCCESS } from '../constants/types';

export const userPreference = (filters) => async (dispatch) => {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    let url = `/api/article?page=${filters.nextPage}`;
    url += `${filters.sourceId !== '' ? `&sourceId=${filters.sourceId}` : ''}`;
    url += `${filters.categoryId !== '' ? `&categoryId=${filters.categoryId}` : ''}`;
    url += `${filters.authorId !== '' ? `&authorId=${filters.authorId}` : ''}`;

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
