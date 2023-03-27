import {
    GET_MYBOOKINGS,
    SET_MYBOOKINGS,
    GET_MYBOOKING_CLICKED,
    SET_MYBOOKING_CLICKED,
    SET_TOTAL_BOOKINGS,
} from './actionTypes';

export function getMyBookings(query, filters) {
    return {
        type: GET_MYBOOKINGS,
        payload: {
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
