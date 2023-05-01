import {
    OPEN_MODAL_FILTER,
    CLOSE_MODAL_FILTER,
    GET_FACILITIES,
    SET_FACILITIES,
    GET_FACILITY,
    SET_FACILITY,
    DELETE_FACILITIES,
    GET_FILTERS,
    SET_FILTERS,
    POST_BOOKING_START,
    GET_FACILITY_CLICKED,
    SET_FACILITY_CLICKED,
    SET_CALENDAR_BOOK,
    INSERT_NEW_FACILITY,
    UPDATE_FACILITY,
    GET_EVENTS,
    SET_EVENTS,
    INSERT_UPDATE_RESPONSE,
    DELETE_RESPONSE,
    NEW_BOOKING_RESPONSE,
    GET_BOOKING,
    SET_BOOKING,
    GET_BOOKING_OVERVIEW,
    SET_BOOKING_OVERVIEW,
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

export function getFacility(type, id) {
    return {
        type: GET_FACILITY,
        payload: {
            type,
            id,
        },
    };
}

export function setFacility(data) {
    return {
        type: SET_FACILITY,
        payload: data,
    };
}

export function deleteFacility(type, id, page, query, filters) {
    return {
        type: DELETE_FACILITIES,
        payload: {
            type,
            id,
            page,
            query,
            filters,
        },
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

export function postBookingStart(data, category) {
    return {
        type: POST_BOOKING_START,
        payload: {
            data,
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

export function setCalendarBook(calendarRef) {
    return {
        type: SET_CALENDAR_BOOK,
        calendarRef,
    };
}

export function insertNewFacility(type, data) {
    return {
        type: INSERT_NEW_FACILITY,
        payload: {
            type,
            data,
        },
    };
}

export function updateFacility(type, data, id) {
    return {
        type: UPDATE_FACILITY,
        payload: {
            type,
            data,
            id,
        },
    };
}

export function getEvents(start, end) {
    return {
        type: GET_EVENTS,
        payload: {
            start,
            end,
        },
    };
}

export function setEvents(data) {
    return {
        type: SET_EVENTS,
        payload: data,
    };
}

export function insertUpdateResponse(response) {
    return {
        type: INSERT_UPDATE_RESPONSE,
        payload: response,
    };
}

export function deleteResponse(response) {
    return {
        type: DELETE_RESPONSE,
        payload: response,
    };
}

export function newBookingResponse(response) {
    return {
        type: NEW_BOOKING_RESPONSE,
        payload: response,
    };
}

export function getBooking(id) {
    return {
        type: GET_BOOKING,
        payload: {
            id,
        },
    };
}

export function setBooking(data) {
    return {
        type: SET_BOOKING,
        payload: data,
    };
}

export function getBookingOverview(id) {
    return {
        type: GET_BOOKING_OVERVIEW,
        payload: {
            id,
        },
    };
}

export function setBookingOverview(data) {
    return {
        type: SET_BOOKING_OVERVIEW,
        payload: data,
    };
}
