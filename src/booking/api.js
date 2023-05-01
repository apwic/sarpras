import { wretchInstance } from '../common/wretchInstance';

export const getFacilitiesApi = (payload) => {
    return wretchInstance()
        .url(
            import.meta.env.VITE_REST_API_URL +
                '/facility/' +
                payload.type +
                '?page=' +
                payload.page +
                '&limit=' +
                payload.limit +
                (payload.filters !== '' ? '&' + payload.filters : '') +
                '&q=' +
                payload.query,
        )
        .headers({ 'Content-Type': 'application/json' })
        .get()
        .json((response) => {
            return response;
        });
};

export const getFacilityApi = (payload) => {
    return wretchInstance()
        .url(
            import.meta.env.VITE_REST_API_URL +
                '/facility/' +
                payload.type +
                '/' +
                payload.id,
        )
        .headers({
            'Content-Type': 'application/json',
        })
        .get()
        .json((response) => {
            return response;
        });
};

export const deleteFacilityApi = (payload) => {
    return wretchInstance()
        .url(
            import.meta.env.VITE_REST_API_URL +
                '/facility/' +
                payload.type +
                '/' +
                payload.id,
        )
        .headers({
            'Content-Type': 'application/json',
        })
        .delete()
        .json((response) => {
            return response;
        });
};

export const getFiltersApi = () => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/facility/filter')
        .get()
        .json((response) => {
            return response;
        });
};

export const getFacilityClickedApi = (id, category) => {
    return wretchInstance()
        .url(
            import.meta.env.VITE_REST_API_URL +
                '/facility/' +
                category +
                '/' +
                id,
        )
        .headers({
            'Content-Type': 'application/json',
        })
        .get()
        .json((response) => {
            return response;
        });
};

export const postBookingApi = async (data, category) => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/booking/' + category)
        .formData(data)
        .post()
        .json((response) => {
            return response;
        });
};

export const insertNewFacilityApi = async (data, category) => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/facility/' + category)
        .formData(data)
        .post()
        .json((response) => {
            return response;
        });
};

export const updateFacilityApi = async (data, category, id) => {
    return wretchInstance()
        .url(
            import.meta.env.VITE_REST_API_URL +
                '/facility/' +
                category +
                '/' +
                id,
        )
        .formData(data)
        .put()
        .json((response) => {
            return response;
        });
};

export const getEventsApi = async (start, end) => {
    return wretchInstance()
        .url(
            import.meta.env.VITE_REST_API_URL +
                '/booking/schedule?start=' +
                start +
                '&end=' +
                end,
        )
        .headers({
            'Content-Type': 'application/json',
        })
        .get()
        .json((response) => {
            return response;
        });
};

export const getBookingApi = (id) => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/booking/' + id)
        .get()
        .json((response) => {
            return response;
        });
};

export const getBookingOverviewApi = (id) => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/booking/' + id + '/overview')
        .get()
        .json((response) => {
            return response;
        });
};
