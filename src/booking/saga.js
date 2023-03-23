import { call, takeLatest, put } from '@redux-saga/core/effects';

import {
    GET_FACILITIES,
    GET_FACILITY_CLICKED,
    POST_BOOKING_START,
} from './actionTypes';
import {
    setFacilities,
    setFacilityClicked,
    postBookingSuccess,
} from './action';
import { getFacilitiesApi, getFacilityClickedApi, postBookingApi } from './api';

function* getFacilities(action) {
    try {
        const response = yield call(getFacilitiesApi, action.payload);
        yield put(setFacilities(response.data));
    } catch (error) {
        console.log(error);
    }
}

function* getFacilityClicked(action) {
    const { id, category } = action.payload;
    try {
        const response = yield call(getFacilityClickedApi, id, category);
        yield put(setFacilityClicked(response.data));
    } catch (error) {
        console.log(error);
    }
}

function* postBooking(action) {
    const { data, category } = action.payload;
    try {
        yield call(postBookingApi, data, category);
        yield put(postBookingSuccess());
    } catch (error) {
        console.log(error);
    }
}

const facilitiesSaga = [
    takeLatest(GET_FACILITIES, getFacilities),
    takeLatest(GET_FACILITY_CLICKED, getFacilityClicked),
    takeLatest(POST_BOOKING_START, postBooking),
];

export default facilitiesSaga;
