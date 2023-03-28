import { call, put, takeLatest } from 'redux-saga/effects';

import { GET_MYBOOKINGS, GET_MYBOOKING_CLICKED } from './actionTypes';
import { setMyBookings, setMyBookingClicked, setTotalBookings } from './action';
import { getMyBookingsApi, getMyBookingClickedApi } from './api';
import { getFacilityApi } from '../booking/api';

function* getMyBookings(action) {
    try {
        const response = yield call(getMyBookingsApi, action.payload);
        for (let i = 0; i < response.data.length; i++) {
            let type = response.data[i].category.toLowerCase();
            let id = response.data[i].facility_id;
            let facility = yield call(getFacilityApi, { type, id });
            response.data[i].facility = yield facility.data;
        }
        yield put(setMyBookings(response.data));
        yield put(setTotalBookings(response.data.length));
    } catch (error) {
        console.log(error);
    }
}

function* getMyBookingClicked(action) {
    try {
        const response = yield call(getMyBookingClickedApi, action.payload);
        const type = response.data.category.toLowerCase();
        const id = response.data.facility_id;
        const facility = yield call(getFacilityApi, { type, id });
        response.data.facility = yield facility.data;
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
