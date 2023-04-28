import { wretchInstance } from '../common/wretchInstance';

export const setBookingReviewApi = (payload) => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/booking/review')
        .headers({
            'Content-Type': 'application/json',
        })
        .post({
            booking_id: payload.id,
            rating: payload.rating,
            description: payload.description,
        })
        .json((response) => {
            return response;
        });
};

export const setReportReviewApi = (payload) => {
    return wretchInstance()
        .url(import.meta.env.VITE_REST_API_URL + '/issue/review')
        .headers({
            'Content-Type': 'application/json',
        })
        .post({
            issue_id: payload.id,
            rating: payload.rating,
            description: payload.description,
        })
        .json((response) => {
            return response;
        });
};
