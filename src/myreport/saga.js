import { call, takeLatest } from 'redux-saga/effects';
import { POST_REPORT } from './actionTypes';
import { postReportApi } from './api';

function* postReport(action) {
    try {
        const response = yield call(postReportApi, action.payload);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

const myReportSaga = [takeLatest(POST_REPORT, postReport)];

export default myReportSaga;
