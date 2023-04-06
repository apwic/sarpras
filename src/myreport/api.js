import { wretchInstance } from '../common/wretchInstance';

export const postReportApi = async (data) => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/issue')
        .formData(data)
        .post()
        .json((response) => {
            return response;
        });
};

export const getMyReportsApi = (payload) => {
    return wretchInstance()
        .url(
            import.meta.env.VITE_REST_API_URL +
                '/issue/my' +
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

export const getMyReportClickedApi = (payload) => {
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
