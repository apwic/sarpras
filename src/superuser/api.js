import { wretchInstance } from '../common/wretchInstance';

export const getAllAssignedStaffApi = () => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/role/assigned')
        .headers({
            'Content-Type': 'application/json',
        })
        .get()
        .json((response) => {
            return response;
        });
};

export const revokeRoleApi = (userId) => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/role/revoke')
        .headers({
            'Content-Type': 'application/json',
        })
        .put({
            user_id: userId,
        })
        .json((response) => {
            return response;
        });
};

export const getAllUnsignedStaffApi = () => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/role/unassigned')
        .headers({
            'Content-Type': 'application/json',
        })
        .get()
        .json((response) => {
            return response;
        });
};

export const setStaffToRoleApi = (userId, role) => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/role/grant')
        .headers({
            'Content-Type': 'application/json',
        })
        .put({
            user_id: userId,
            role: role,
        })
        .json((response) => {
            return response;
        });
};
