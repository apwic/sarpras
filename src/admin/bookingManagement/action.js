import {
    GET_BOOKING_LIST,
    SET_BOOKING_LIST,
    OPEN_MODAL_FILTER,
    CLOSE_MODAL_FILTER,
    GET_BOOKING,
    SET_BOOKING,
} from './actionTypes';

export function getBookingList(query, page, limit, filters) {
    return {
        type: GET_BOOKING_LIST,
        payload: {
            query,
            page,
            limit,
            filters,
        },
    };
}

export function setBookingList(data) {
    return {
        type: SET_BOOKING_LIST,
        payload: data,
    };
}

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

export function getBooking(id) {
    return {
        type: GET_BOOKING,
        payload: id,
    };
}

export function setBooking(data) {
    return {
        type: SET_BOOKING,
        payload: data,
    };
}
