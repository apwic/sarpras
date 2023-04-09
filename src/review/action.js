import {
    SET_BOOKING_REVIEW,
    SET_BOOKING_REVIEW_RESPONSE,
    SET_REPORT_REVIEW,
    SET_REPORT_REVIEW_RESPONSE,
} from './actionTypes';

export const setBookingReview = (id, rating, description) => ({
    type: SET_BOOKING_REVIEW,
    payload: {
        id,
        rating,
        description,
    },
});

export const setBookingReviewResponse = (response) => ({
    type: SET_BOOKING_REVIEW_RESPONSE,
    payload: response,
});

export const setReportReview = (id, rating, description) => ({
    type: SET_REPORT_REVIEW,
    payload: {
        id,
        rating,
        description,
    },
});

export const setReportReviewResponse = (response) => ({
    type: SET_REPORT_REVIEW_RESPONSE,
    payload: response,
});
