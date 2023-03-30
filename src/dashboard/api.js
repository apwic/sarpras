import { wretchInstance } from '../common/wretchInstance';

export const getStatisticsApi = (params) => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/booking/stat' + params)
        .get()
        .json();
};
