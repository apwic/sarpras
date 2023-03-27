import wretch from 'wretch';
import { storage } from '../common/storage';

export const getMyBookingsApi = () => {
    return wretch()
        .url(import.meta.env.VITE_REST_API_URL + '/booking/my')
        .headers({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + storage.getToken(),
        })
        .get()
        .error(400, (error) => {
            return JSON.parse(error.message);
        })
        .json((response) => {
            return response;
        });
};

export const getMyBookingClickedApi = (payload) => {
    return wretch()
        .url(import.meta.env.VITE_REST_API_URL + '/booking/' + payload)
        .headers({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + storage.getToken(),
        })
        .get()
        .error(400, (error) => {
            return JSON.parse(error.message);
        })
        .json((response) => {
            return response;
        });
};
