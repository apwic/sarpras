import { call, put, takeLatest } from 'redux-saga/effects';
import { SET_BOOKING_REVIEW, SET_REPORT_REVIEW } from './actionTypes';
import { setBookingReviewResponse, setReportReviewResponse } from './action';
import { setBookingReviewApi, setReportReviewApi } from './api';

export function* setBookingReviewSaga(action) {
    try {
        const response = yield call(setBookingReviewApi, action.payload);
        yield put(setBookingReviewResponse(response));
    } catch (error) {
        console.log(error);
    }
}

export function* setReportReviewSaga(action) {
    try {
        const response = yield call(setReportReviewApi, action.payload);
        yield put(setReportReviewResponse(response));
    } catch (error) {
        console.log(error);
    }
}

const reviewSaga = [
    takeLatest(SET_BOOKING_REVIEW, setBookingReviewSaga),
    takeLatest(SET_REPORT_REVIEW, setReportReviewSaga),
];

export default reviewSaga;
