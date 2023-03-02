import { SET_CALENDAR, OPEN_MODAL, CLOSE_MODAL } from "./actionTypes";

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