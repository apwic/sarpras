import wretch from 'wretch';
import { storage } from '../common/storage';

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
                (payload.filters !== '' ? '&' + payload.filters : '') +
                '&q=' +
                payload.query,
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

export const getFacilityApi = (payload) => {
    return wretch()
        .url(
            import.meta.env.VITE_REST_API_URL +
                '/facility/' +
                payload.type +
                '/' +
                payload.id,
        )
        .headers({
            Authorization: 'Bearer ' + storage.getToken(),
            'Content-Type': 'application/json',
        })
        .get()
        .error(400, (error) => {
            return JSON.parse(error.message);
        })
        .json((response) => {
            return response;
        });
};

export const deleteFacilityApi = (payload) => {
    return wretch()
        .url(
            import.meta.env.VITE_REST_API_URL +
                '/facility/' +
                payload.type +
                '/' +
                payload.id,
        )
        .headers({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + storage.getToken(),
        })
        .delete()
        .error(400, (error) => {
            return JSON.parse(error.message);
        })
        .json((response) => {
            return response;
        });
};

export const getFiltersApi = () => {
    return wretch()
        .url(import.meta.env.VITE_REST_API_URL + '/facility/filter')
        .get()
        .error(400, (error) => {
            return JSON.parse(error.message);
        })
        .json((response) => {
            return response;
        });
};

export const getFacilityClickedApi = (id, category) => {
    switch (category) {
        case 'vehicle': {
            return wretch()
                .url(
                    import.meta.env.VITE_REST_API_URL +
                        '/facility/vehicle/' +
                        id,
                )
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
        }
        case 'room': {
            return wretch()
                .url(import.meta.env.VITE_REST_API_URL + '/facility/room/' + id)
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
        }
        case 'building': {
            return wretch()
                .url(
                    import.meta.env.VITE_REST_API_URL +
                        '/facility/building/' +
                        id,
                )
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
        }
        case 'selasar': {
            return wretch()
                .url(
                    import.meta.env.VITE_REST_API_URL +
                        '/facility/selasar/' +
                        id,
                )
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
        }
        default: {
            return;
        }
    }
};

export const postBookingApi = async (data, category) => {
    switch (category) {
        case 'vehicle': {
            const response = await fetch(
                import.meta.env.VITE_REST_API_URL + '/booking/vehicle',
                {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + storage.getToken(),
                    },
                    body: data,
                },
            );
            return await response.json();
        }
        case 'room': {
            const response = await fetch(
                import.meta.env.VITE_REST_API_URL + '/booking/room',
                {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + storage.getToken(),
                    },
                    body: data,
                },
            );
            return await response.json();
        }
        case 'building': {
            const response = await fetch(
                import.meta.env.VITE_REST_API_URL + '/booking/building',
                {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + storage.getToken(),
                    },
                    body: data,
                },
            );
            return await response.json();
        }
        case 'selasar': {
            const response = await fetch(
                import.meta.env.VITE_REST_API_URL + '/booking/selasar',
                {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + storage.getToken(),
                    },
                    body: data,
                },
            );
            return await response.json();
        }
        default: {
            return;
        }
    }
};

export const insertNewFacilityApi = async (data, category) => {
    const response = await fetch(
        import.meta.env.VITE_REST_API_URL + '/facility/' + category,
        {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + storage.getToken(),
            },
            body: data,
        },
    );
    return await response.json();
};

export const updateFacilityApi = async (data, category, id) => {
    console.log('updating', data);
    const response = await fetch(
        import.meta.env.VITE_REST_API_URL + '/facility/' + category + '/' + id,
        {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + storage.getToken(),
            },
            body: data,
        },
    );
    return await response.json();
};
