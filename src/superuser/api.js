import wretch from 'wretch';
import { storage } from '../common/storage';

export const getAllAssignedStaffApi = () => {
    return wretch()
        .url(import.meta.env.VITE_REST_API_URL + '/role/assigned')
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
};

export const revokeRoleApi = (userId) => {
    return wretch()
        .url(import.meta.env.VITE_REST_API_URL + '/role/revoke')
        .headers({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + storage.getToken(),
        })
        .put({
            user_id: userId,
        })
        .error(400, (error) => {
            return JSON.parse(error.message);
        })
        .json((response) => {
            return response;
        });
};

export const getAllUnsignedStaffApi = () => {
    return wretch()
        .url(import.meta.env.VITE_REST_API_URL + '/role/unassigned')
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
};

export const setStaffToRoleApi = (userId, role) => {
    return wretch()
        .url(import.meta.env.VITE_REST_API_URL + '/role/grant')
        .headers({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + storage.getToken(),
        })
        .put({
            user_id: userId,
            role: role,
        })
        .error(400, (error) => {
            return JSON.parse(error.message);
        })
        .json((response) => {
            return response;
        });
};
