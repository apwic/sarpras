import { wretchInstance } from '../common/wretchInstance';

export const getMyBookingsApi = (payload) => {
    return wretchInstance()
        .url(
            import.meta.env.VITE_REST_API_URL +
                '/booking/my' +
                '?q=' +
                payload.query +
                '&page=' +
                payload.page +
                '&limit=' +
                payload.limit +
                (payload.filters !== '' ? '&' + payload.filters : ''),
        )
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
