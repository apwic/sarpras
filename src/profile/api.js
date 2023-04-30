import { wretchInstance } from '../common/wretchInstance';

export const editProfileAPI = async (profile) => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/profile/edit')
        .formData(profile)
        .put()
        .json((response) => {
            return response;
        });
};

export const readAllNotificationsAPI = async () => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/notification/read-all')
        .put()
        .json((response) => {
            return response;
        });
};
