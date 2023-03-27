import {
    SET_MYBOOKINGS,
    SET_MYBOOKING_CLICKED,
    SET_TOTAL_BOOKINGS,
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
        default:
            return state;
    }
}

export default myBookingReducer;
