import {
    OPEN_MODAL_FILTER,
    CLOSE_MODAL_FILTER,
    SET_FACILITIES,
    SET_FACILITY_CLICKED,
    SET_CALENDAR_BOOK,
} from './actionTypes';

const initialState = {
    filterModalOpen: false,
    facilities: [],
    facilityClicked: {},
    calendarBookRef: null,
};

function facilityReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FACILITIES:
            return { ...state, facilities: action.payload };
        case OPEN_MODAL_FILTER:
            return { ...state, filterModalOpen: true };
        case CLOSE_MODAL_FILTER:
            return { ...state, filterModalOpen: false };
        case SET_FACILITY_CLICKED:
            return { ...state, facilityClicked: action.payload };
        case SET_CALENDAR_BOOK:
            console.log('action.ref', action.calendarRef);
            return { ...state, calendarBookRef: action.calendarRef };
        default:
            return state;
    }
}

export default facilityReducer;
