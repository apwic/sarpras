import { wretchInstance } from '../common/wretchInstance';

export const getMyBookingsApi = () => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/booking/my')
        .headers({
            'Content-Type': 'application/json',
        })
        .get()
        .json((response) => {
            return response;
        });
};

export const getMyBookingClickedApi = (payload) => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/booking/' + payload)
        .headers({
            'Content-Type': 'application/json',
        })
        .get()
        .json((response) => {
            return response;
        });
};
