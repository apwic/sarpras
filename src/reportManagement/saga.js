import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_REPORTS, GET_REPORT } from './actionTypes';
import { setReports, setReport } from './action';
import { getReportsApi, getReportApi } from './api';

function* getReports(action) {
    try {
        const response = yield call(getReportsApi, action.payload);
        yield put(setReports(response.data));
    } catch (error) {
        console.log(error);
    }
}

function* getReport(action) {
    try {
        const response = yield call(getReportApi, action.payload);
        yield put(setReport(response.data));
    } catch (error) {
        console.log(error);
    }
}

const reportManagementSaga = [
    takeLatest(GET_REPORTS, getReports),
    takeLatest(GET_REPORT, getReport),
];

export default reportManagementSaga;
