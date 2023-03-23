import {
    OPEN_MODAL_FILTER,
    CLOSE_MODAL_FILTER,
    GET_FACILITIES,
    SET_FACILITIES,
    POST_BOOKING_START,
    POST_BOOKING_SUCCESS,
    GET_FACILITY_CLICKED,
    SET_FACILITY_CLICKED,
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

export function postBookingStart(data, category) {
    return {
        type: POST_BOOKING_START,
        payload: {
            data,
            category,
        },
    };
}

export function postBookingSuccess() {
    return {
        type: POST_BOOKING_SUCCESS,
    };
}

export function getFacilityClicked(id, category) {
    return {
        type: GET_FACILITY_CLICKED,
        payload: {
            id,
            category,
        },
    };
}

export function setFacilityClicked(response) {
    return {
        type: SET_FACILITY_CLICKED,
        payload: response,
    };
}
