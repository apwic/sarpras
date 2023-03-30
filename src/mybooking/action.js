import {
    GET_MYBOOKINGS,
    SET_MYBOOKINGS,
    GET_MYBOOKING_CLICKED,
    SET_MYBOOKING_CLICKED,
    SET_TOTAL_BOOKINGS,
    OPEN_MODAL_FILTER,
    CLOSE_MODAL_FILTER,
    GET_FILTERS,
    SET_FILTERS,
} from './actionTypes';

export function getMyBookings(page, limit, query, filters) {
    return {
        type: GET_MYBOOKINGS,
        payload: {
            page,
            limit,
            query,
            filters,
        },
    };
}

export function setMyBookings(data) {
    return {
        type: SET_MYBOOKINGS,
        payload: data,
    };
}

export function getMyBookingClicked(id) {
    return {
        type: GET_MYBOOKING_CLICKED,
        payload: id,
    };
}

export function setMyBookingClicked(response) {
    return {
        type: SET_MYBOOKING_CLICKED,
        payload: response,
    };
}

export function setTotalBookings(total) {
    return {
        type: SET_TOTAL_BOOKINGS,
        payload: total,
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

export function getFilters() {
    return {
        type: GET_FILTERS,
    };
}

export function setFilters(data) {
    return {
        type: SET_FILTERS,
        payload: data,
    };
}
