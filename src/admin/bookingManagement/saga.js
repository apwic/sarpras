import { call, takeLatest, put } from '@redux-saga/core/effects';
import { GET_BOOKING_LIST, GET_BOOKING } from './actionTypes';
import { setBookingList, setBooking } from './action';
import { getBookingListApi, getBookingApi } from './api';

function* getBookingListSaga(action) {
    try {
        const response = yield call(getBookingListApi, action.payload);
        yield put(setBookingList(response.data));
    } catch (error) {
        console.log(error);
    }
}

function* getBookingSaga(action) {
    try {
        const response = yield call(getBookingApi, action.payload);
        yield put(setBooking(response.data));
    } catch (error) {
        console.log(error);
    }
}

const bookingManagementSaga = [
    takeLatest(GET_BOOKING_LIST, getBookingListSaga),
    takeLatest(GET_BOOKING, getBookingSaga),
];

export default bookingManagementSaga;
