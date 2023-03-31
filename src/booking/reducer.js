import {
    OPEN_MODAL_FILTER,
    CLOSE_MODAL_FILTER,
    SET_FACILITIES,
    SET_FACILITY,
    SET_FILTERS,
    SET_FACILITY_CLICKED,
    SET_CALENDAR_BOOK,
    SET_EVENTS,
    INSERT_UPDATE_RESPONSE,
    DELETE_RESPONSE,
    NEW_BOOKING_RESPONSE,
    SET_BOOKING,
} from './actionTypes';

const initialState = {
    filterModalOpen: false,
    facilities: [],
    filters: null,
    facility: null,
    facilityClicked: {},
    calendarBookRef: null,
    eventsShown: [],
    insert_update_message: null,
    delete_message: null,
    new_booking_message: null,
    booking: null,
};

function facilityReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FACILITIES:
            return { ...state, facilities: action.payload };
        case SET_FACILITY:
            return { ...state, facility: action.payload };
        case OPEN_MODAL_FILTER:
            return { ...state, filterModalOpen: true };
        case CLOSE_MODAL_FILTER:
            return { ...state, filterModalOpen: false };
        case SET_FILTERS:
            return { ...state, filters: action.payload };
        case SET_FACILITY_CLICKED:
            return { ...state, facilityClicked: action.payload };
        case SET_CALENDAR_BOOK:
            return { ...state, calendarBookRef: action.calendarRef };
        case SET_EVENTS:
            return { ...state, eventsShown: action.payload };
        case INSERT_UPDATE_RESPONSE:
            return { ...state, insert_update_message: action.payload };
        case DELETE_RESPONSE:
            return { ...state, delete_message: action.payload };
        case NEW_BOOKING_RESPONSE:
            return { ...state, new_booking_message: action.payload };
        case SET_BOOKING:
            return { ...state, booking: action.payload };
        default:
            return state;
    }
}

export default facilityReducer;
