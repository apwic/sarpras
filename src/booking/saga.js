import { call, takeLatest, put } from '@redux-saga/core/effects';

import {
    GET_FACILITIES,
    DELETE_FACILITIES,
    GET_FILTERS,
    GET_FACILITY,
    GET_FACILITY_CLICKED,
    POST_BOOKING_START,
    INSERT_NEW_FACILITY,
    UPDATE_FACILITY,
} from './actionTypes';
import {
    setFacilities,
    getFacilities,
    setFilters,
    setFacility,
    setFacilityClicked,
    postBookingSuccess,
} from './action';
import {
    getFacilitiesApi,
    getFacilityApi,
    deleteFacilityApi,
    getFiltersApi,
    getFacilityClickedApi,
    postBookingApi,
    insertNewFacilityApi,
    updateFacilityApi,
} from './api';

function* getFacilitiesSaga(action) {
    try {
        const response = yield call(getFacilitiesApi, action.payload);
        yield put(setFacilities(response.data));
    } catch (error) {
        console.log(error);
    }
}

function* getFacility(action) {
    try {
        const response = yield call(getFacilityApi, action.payload);
        yield put(setFacility(response.data));
    } catch (error) {
        console.log(error);
    }
}

function* deleteFacility(action) {
    try {
        yield call(deleteFacilityApi, action.payload);
        yield put(
            getFacilities(
                action.payload.type + 's',
                action.payload.page,
                9,
                action.payload.query,
                action.payload.filters,
            ),
        );
    } catch (error) {
        console.log(error);
    }
}

function* getFilters() {
    try {
        const response = yield call(getFiltersApi);
        yield put(setFilters(response));
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

function* insertNewFacility(action) {
    const { data, type } = action.payload;
    try {
        yield call(insertNewFacilityApi, data, type);
    } catch (error) {
        console.log(error);
    }
}

function* updateFacility(action) {
    const { data, type, id } = action.payload;
    try {
        yield call(updateFacilityApi, data, type, id);
    } catch (error) {
        console.log(error);
    }
}

const facilitiesSaga = [
    takeLatest(GET_FACILITIES, getFacilitiesSaga),
    takeLatest(DELETE_FACILITIES, deleteFacility),
    takeLatest(GET_FILTERS, getFilters),
    takeLatest(GET_FACILITY, getFacility),
    takeLatest(GET_FACILITY_CLICKED, getFacilityClicked),
    takeLatest(POST_BOOKING_START, postBooking),
    takeLatest(INSERT_NEW_FACILITY, insertNewFacility),
    takeLatest(UPDATE_FACILITY, updateFacility),
];

export default facilitiesSaga;
