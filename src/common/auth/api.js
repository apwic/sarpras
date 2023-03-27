import { wretchInstance } from '../wretchInstance';

export const loginApi = () => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/login/test')
        .headers({ 'Content-Type': 'application/json' })
        .get()
        .json((response) => {
            return response;
        });
};

export const getUserApi = () => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/profile')
        .headers({
            'Content-Type': 'application/json',
        })
        .get()
        .json((response) => {
            return response;
        });
};
