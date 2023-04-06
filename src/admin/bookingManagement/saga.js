import { call, takeLatest, put } from '@redux-saga/core/effects';
import { GET_BOOKING_LIST, GET_BOOKING, EDIT_BOOKING } from './actionTypes';
import {
    setBookingList,
    setBooking,
    setFacilities,
    getBooking,
    editBookingSuccess,
} from './action';
import { getBookingListApi, getBookingApi, editBookingApi } from './api';
import { getFacilitiesApi } from '../../booking/api';

function* getBookingListSaga(action) {
    try {
        const response = yield call(getBookingListApi, action.payload);
        yield put(setBookingList(response.data));
    } catch (error) {
        console.log(error);
    }
}

function* getBookingSaga(action) {
    const { id } = action.payload;
    try {
        const response = yield call(getBookingApi, id);
        yield put(setBooking(response.data));
        const category = response.data.category;
        const getFacility = {
            type: category.toLowerCase() + 's',
            page: 1,
            limit: 100,
            filters: '',
            query: '',
        };
        const facilities = yield call(getFacilitiesApi, getFacility);
        yield put(setFacilities(facilities.data.rows));
    } catch (error) {
        console.log(error);
    }
}

function* editBookingSaga(action) {
    try {
        const response = yield call(editBookingApi, action.payload);
        yield put(editBookingSuccess(response));
        yield put(getBooking(action.payload.id));
    } catch (error) {
        console.log(error);
    }
}

const bookingManagementSaga = [
    takeLatest(GET_BOOKING_LIST, getBookingListSaga),
    takeLatest(GET_BOOKING, getBookingSaga),
    takeLatest(EDIT_BOOKING, editBookingSaga),
];

export default bookingManagementSaga;
