import { call, takeLatest, put } from '@redux-saga/core/effects'

import { GET_ALL_ASSIGNED_STAFF } from "./actionTypes";
import { setAllAssignedStaff } from "./action";
import { getAllAssignedStaffApi } from "./api";

function* getAllAssignedStaff() {
    try {
        const response = yield call(getAllAssignedStaffApi);
        yield put(setAllAssignedStaff(response.data))
    } catch (error) {
        console.log(error)
    }
}

const superUserSaga = [
    takeLatest(GET_ALL_ASSIGNED_STAFF, getAllAssignedStaff),
];

export default superUserSaga;