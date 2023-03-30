import { call, put, takeLatest } from 'redux-saga/effects';
import { setStatistics } from './action';
import { GET_STATISTICS } from './actionTypes';
import { getStatisticsApi } from './api';

function* getStatistics(action) {
    try {
        const response = yield call(getStatisticsApi, action.params);
        yield put(setStatistics(response.data));
    } catch (error) {
        console.log(error);
    }
}

const dashboardSaga = [takeLatest(GET_STATISTICS, getStatistics)];

export default dashboardSaga;
