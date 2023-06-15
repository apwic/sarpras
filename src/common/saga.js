import { all } from 'redux-saga/effects';
import profileSaga from '../profile/saga';
import superUserSaga from '../superuser/saga';
import authSaga from './auth/saga';
import facilitiesSaga from '../booking/saga';
import myBookingSaga from '../mybooking/saga';
import dashboardSaga from '../dashboard/saga';
import bookingManagementSaga from '../admin/bookingManagement/saga';
import myReportSaga from '../myreport/saga';
import reportManagementSaga from '../reportManagement/saga';
import reviewSaga from '../review/saga';

export default function* rootSaga() {
    yield all([
        ...authSaga,
        ...superUserSaga,
        ...profileSaga,
        ...facilitiesSaga,
        ...myBookingSaga,
        ...dashboardSaga,
        ...bookingManagementSaga,
        ...myReportSaga,
        ...reportManagementSaga,
        ...reviewSaga,
    ]);
}
