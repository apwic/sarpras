import { call, takeLatest, put } from '@redux-saga/core/effects';

import { GET_FACILITIES } from './actionTypes';
import { setFacilities } from './action';
import { getFacilitiesApi } from './api';

function* getFacilities(action) {
    try {
        const response = yield call(getFacilitiesApi, action.payload);
        yield put(setFacilities(response.data));
    } catch (error) {
        console.log(error);
    }
}

const facilitiesSaga = [takeLatest(GET_FACILITIES, getFacilities)];

export default facilitiesSaga;
