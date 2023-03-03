import { call, takeLatest, put } from '@redux-saga/core/effects'

import { GET_ALL_ASSIGNED_STAFF, REVOKE_ROLE, GET_ALL_UNSIGNED_STAFF, SET_STAFF_TO_ROLE } from "./actionTypes";
import { setAllAssignedStaff, revokeRoleAsync, setAllUnsignedStaff, setStafftoRole } from "./action";
import { getAllAssignedStaffApi, revokeRoleApi, getAllUnsignedStaffApi, setStaffToRoleApi } from "./api";

function* getAllAssignedStaff() {
    try {
        const response = yield call(getAllAssignedStaffApi);
        yield put(setAllAssignedStaff(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* revokeRole() {
    try {
        const response = yield call(revokeRoleApi, userId);
        if (response.status === 200){
            yield put(revokeRoleAsync(userId));
        }
    } catch (error) {
        console.log(error)
    }
}

function* getAllUnsignedStaff() {
    try {
        const response = yield call(getAllUnsignedStaffApi);
        yield put(setAllUnsignedStaff(response.data))
    } catch (error) {
        console.log(error)
    }
}

function* setStaffToRole(userId, role) {
    try {
        const response = yield call(setStaffToRoleApi, userId, role);
        if (response.status === 200){
            yield put(setStafftoRole(userId, role));
            yield put(getAllUnsignedStaff());
            yield put(getAllAssignedStaff());
        }
    } catch (error) {
        console.log(error)
    }
}

const superUserSaga = [
    takeLatest(GET_ALL_ASSIGNED_STAFF, getAllAssignedStaff),
    takeLatest(REVOKE_ROLE, revokeRole),
    takeLatest(GET_ALL_UNSIGNED_STAFF, getAllUnsignedStaff),
    takeLatest(SET_STAFF_TO_ROLE, setStaffToRole),
];

export default superUserSaga;