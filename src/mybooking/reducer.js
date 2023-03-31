import {
    SET_MYBOOKINGS,
    SET_MYBOOKING_CLICKED,
    SET_TOTAL_BOOKINGS,
    OPEN_MODAL_FILTER,
    CLOSE_MODAL_FILTER,
} from './actionTypes';

const initialState = {
    myBookings: [],
};

function myBookingReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MYBOOKINGS:
            return { ...state, myBookings: action.payload };
        case SET_MYBOOKING_CLICKED:
            return { ...state, myBookingClicked: action.payload };
        case SET_TOTAL_BOOKINGS:
            return { ...state, totalBookings: action.payload };
        case OPEN_MODAL_FILTER:
            return { ...state, filterModalOpen: true };
        case CLOSE_MODAL_FILTER:
            return { ...state, filterModalOpen: false };
        default:
            return state;
    }
}

export default myBookingReducer;
