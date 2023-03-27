import { call, put, takeLatest } from 'redux-saga/effects';

import { GET_MYBOOKINGS, GET_MYBOOKING_CLICKED } from './actionTypes';
import { setMyBookings, setMyBookingClicked, setTotalBookings } from './action';
import { getMyBookingsApi, getMyBookingClickedApi } from './api';

function* getMyBookings(action) {
    try {
        const response = yield call(getMyBookingsApi, action.payload);
        yield put(setMyBookings(response.data));
        yield put(setTotalBookings(response.data.length));
    } catch (error) {
        console.log(error);
    }
}

function* getMyBookingClicked(action) {
    try {
        const response = yield call(getMyBookingClickedApi, action.payload);
        yield put(setMyBookingClicked(response.data));
    } catch (error) {
        console.log(error);
    }
}

const myBookingSaga = [
    takeLatest(GET_MYBOOKINGS, getMyBookings),
    takeLatest(GET_MYBOOKING_CLICKED, getMyBookingClicked),
];

export default myBookingSaga;
