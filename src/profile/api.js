import { storage } from "../common/storage";

export const editProfileAPI = async (profile) => {
    const response = await fetch(import.meta.env.VITE_REST_API_URL + '/profile/edit', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + storage.getToken(),
        },
        body: profile,
    });
    return await response.json();
};