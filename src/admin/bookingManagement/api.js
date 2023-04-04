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
    console.log(id);
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/booking/' + id)
        .headers({ 'Content-Type': 'application/json' })
        .get()
        .json((response) => {
            return response;
        });
};

export const editBookingApi = (payload) => {
    const data = {
        facility_id: payload.facility_id,
        cost: payload.cost,
        status: payload.status,
    };
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/booking/' + payload.id)
        .headers({ 'Content-Type': 'application/json' })
        .put(data)
        .json((response) => {
            return response;
        });
};
