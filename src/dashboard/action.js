import {
    SET_CALENDAR,
    OPEN_MODAL,
    CLOSE_MODAL,
    GET_STATISTICS,
    SET_STATISTICS,
} from './actionTypes';

export function setCalendar(calendarRef) {
    return {
        type: SET_CALENDAR,
        calendarRef,
    };
}

export function openModal(selectedDate) {
    return {
        type: OPEN_MODAL,
        selectedDate,
    };
}

export function closeModal() {
    return {
        type: CLOSE_MODAL,
    };
}

export function getStatistics(params) {
    return {
        type: GET_STATISTICS,
        params,
    };
}

export function setStatistics(stats) {
    return {
        type: SET_STATISTICS,
        stats,
    };
}
