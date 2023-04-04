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
