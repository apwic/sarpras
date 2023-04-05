import { call, takeLatest, put } from 'redux-saga/effects';
import { POST_REPORT } from './actionTypes';
import { postReportSuccess } from './action';
import { postReportApi } from './api';

function* postReport(action) {
    try {
        const response = yield call(postReportApi, action.payload);
        yield put(postReportSuccess(response.message));
    } catch (error) {
        console.log(error);
    }
}

const myReportSaga = [takeLatest(POST_REPORT, postReport)];

export default myReportSaga;
