import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_REPORTS, GET_REPORT, EDIT_REPORT } from './actionTypes';
import { setReports, setReport, editReportResponse } from './action';
import { getReportsApi, getReportApi, editReportApi } from './api';

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

function* editReport(action) {
    try {
        const response = yield call(editReportApi, action.payload);
        yield put(editReportResponse(response));
    } catch (error) {
        console.log(error);
    }
}

const reportManagementSaga = [
    takeLatest(GET_REPORTS, getReports),
    takeLatest(GET_REPORT, getReport),
    takeLatest(EDIT_REPORT, editReport),
];

export default reportManagementSaga;
