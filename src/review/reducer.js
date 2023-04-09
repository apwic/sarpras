import {
    SET_BOOKING_REVIEW_RESPONSE,
    SET_REPORT_REVIEW_RESPONSE,
} from './actionTypes';

const initialState = {
    bookingReviewResponse: null,
    reportReviewResponse: null,
};

export default function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case SET_BOOKING_REVIEW_RESPONSE:
            return { ...state, bookingReviewResponse: action.payload };
        case SET_REPORT_REVIEW_RESPONSE:
            return { ...state, reportReviewResponse: action.payload };
        default:
            return state;
    }
}
