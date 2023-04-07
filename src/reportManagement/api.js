import { wretchInstance } from '../common/wretchInstance';

export const getReportApi = (payload) => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/issue/' + payload)
        .headers({
            'Content-Type': 'application/json',
        })
        .get()
        .json((response) => {
            return response;
        });
};

export const getReportsApi = (payload) => {
    return wretchInstance()
        .url(
            import.meta.env.VITE_REST_API_URL +
                '/issue/search' +
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

export const editReportApi = (payload) => {
    return wretchInstance()
        .url(
            import.meta.env.VITE_REST_API_URL +
                '/issue/' +
                payload.id +
                '/staff',
        )
        .headers({
            'Content-Type': 'application/json',
        })
        .put(payload.data)
        .json((response) => {
            return response;
        });
};
