import {
    OPEN_MODAL_FILTER,
    CLOSE_MODAL_FILTER,
    GET_FACILITIES,
    SET_FACILITIES,
} from './actionTypes';

export function openModalFilter() {
    return {
        type: OPEN_MODAL_FILTER,
    };
}

export function closeModalFilter() {
    return {
        type: CLOSE_MODAL_FILTER,
    };
}

export function getFacilities(type, page, limit, query, filters) {
    return {
        type: GET_FACILITIES,
        payload: {
            type,
            page,
            limit,
            query,
            filters,
        },
    };
}

export function setFacilities(data) {
    return {
        type: SET_FACILITIES,
        payload: data,
    };
}
