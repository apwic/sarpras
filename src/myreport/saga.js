import { call, takeLatest, put } from 'redux-saga/effects';
import {
    GET_MYREPORTS,
    GET_MYREPORT_CLICKED,
    POST_REPORT,
} from './actionTypes';
import {
    setMyReports,
    setMyReportClicked,
    setTotalReports,
    postReportSuccess,
} from './action';
import { getMyReportsApi, getMyReportClickedApi, postReportApi } from './api';

function* postReport(action) {
    try {
        const response = yield call(postReportApi, action.payload);
        yield put(postReportSuccess(response.message));
    } catch (error) {
        console.log(error);
    }
}

function* getMyReports() {
    try {
        const response = yield call(getMyReportsApi);
        yield put(setMyReports(response.data));
        yield put(setTotalReports(response.data.length));
    } catch (error) {
        console.log(error);
    }
}

function* getMyReportClicked(action) {
    try {
        const response = yield call(getMyReportClickedApi, action.payload);
        yield put(setMyReportClicked(response.data));
    } catch (error) {
        console.log(error);
    }
}

const myReportSaga = [
    takeLatest(GET_MYREPORTS, getMyReports),
    takeLatest(GET_MYREPORT_CLICKED, getMyReportClicked),
    takeLatest(POST_REPORT, postReport),
];

export default myReportSaga;
