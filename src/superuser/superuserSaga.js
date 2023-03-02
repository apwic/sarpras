import { call, takeLatest, put } from '@redux-saga/core/effects'

import { GET_ALL_ASSIGNED_STAFF } from "./actionTypes";
import { getAllAsignedStaffAction } from "./action";
import { getAllAssignedStaffApi } from "./apiSuperUser";

function* getAllAsignedStaff() {
    try {
        const response = yield call(getAllAssignedStaffApi);
        yield put(getAllAsignedStaffAction(response.data))
    } catch (error) {
        console.log(error)
    }
}

const superUserSaga = [
    takeLatest(GET_ALL_ASSIGNED_STAFF, getAllAsignedStaff),
];

export default superUserSaga;