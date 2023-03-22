import wretch from 'wretch';

export const getFacilitiesApi = (payload) => {
    return wretch()
        .url(
            import.meta.env.VITE_REST_API_URL +
                '/facility/' +
                payload.type +
                '?page=' +
                payload.page +
                '&limit=' +
                payload.limit +
                '&q=' +
                payload.query,
            +'&' + payload.filters,
        )
        .headers({ 'Content-Type': 'application/json' })
        .get()
        .error(400, (error) => {
            return JSON.parse(error.message);
        })
        .json((response) => {
            return response;
        });
};
