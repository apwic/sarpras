import { wretchInstance } from '../../common/wretchInstance';

export const getBookingListApi = (payload) => {
    return wretchInstance()
        .url(
            import.meta.env.VITE_REST_API_URL +
                '/booking' +
                '?q=' +
                payload.query +
                '&page=' +
                payload.page +
                '&limit=' +
                payload.limit +
                (payload.filters !== '' ? '&' + payload.filters : ''),
        )
        .headers({ 'Content-Type': 'application/json' })
        .get()
        .json((response) => {
            return response;
        });
};

export const getBookingApi = (id) => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/booking/' + id)
        .headers({ 'Content-Type': 'application/json' })
        .get()
        .json((response) => {
            return response;
        });
};

export const editBookingApi = (payload) => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/booking/' + payload.id)
        .headers({ 'Content-Type': 'application/json' })
        .put(payload.data)
        .json((response) => {
            return response;
        });
};
