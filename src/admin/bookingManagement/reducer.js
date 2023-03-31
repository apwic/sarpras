import { SET_BOOKING_LIST, SET_BOOKING } from './actionTypes';

const initialState = {
    bookingList: [],
    booking: null,
};

function bookingManagementReducer(state = initialState, action) {
    switch (action.type) {
        case SET_BOOKING_LIST:
            return { ...state, bookingList: action.payload };
        case SET_BOOKING:
            return { ...state, booking: action.payload };
        default:
            return state;
    }
}

export default bookingManagementReducer;
