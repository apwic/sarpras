import {
    SET_BOOKING_LIST,
    SET_BOOKING,
    SET_FACILITIES,
    EDIT_BOOKING_SUCCESS,
} from './actionTypes';

const initialState = {
    bookingList: [],
    booking: null,
    facilities: [],
    successMessage: '',
};

function bookingManagementReducer(state = initialState, action) {
    switch (action.type) {
        case SET_BOOKING_LIST:
            return { ...state, bookingList: action.payload };
        case SET_BOOKING:
            return { ...state, booking: action.payload };
        case SET_FACILITIES:
            return { ...state, facilities: action.payload };
        case EDIT_BOOKING_SUCCESS:
            return { ...state, successMessage: action.payload };
        default:
            return state;
    }
}

export default bookingManagementReducer;
