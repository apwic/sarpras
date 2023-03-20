import { call, takeLatest, put } from '@redux-saga/core/effects';

import {
    GET_ALL_ASSIGNED_STAFF,
    GET_ALL_UNSIGNED_STAFF,
    REVOKE_ROLE_START,
    SET_STAFF_TO_ROLE_START,
} from './actionTypes';
import {
    setAllAssignedStaff,
    revokeRoleSuccess,
    revokeRoleFail,
    setAllUnsignedStaff,
    setStaffToRoleSuccess,
    setStaffToRoleFail,
} from './action';
import {
    getAllAssignedStaffApi,
    revokeRoleApi,
    getAllUnsignedStaffApi,
    setStaffToRoleApi,
} from './api';

function* getAllAssignedStaff() {
    try {
        const response = yield call(getAllAssignedStaffApi);
        yield put(setAllAssignedStaff(response.data));
    } catch (error) {
        console.log(error);
    }
}

function* revokeRole(action) {
    const { id, role } = action.payload;
    try {
        yield call(revokeRoleApi, id);
        yield put(revokeRoleSuccess(id, role));
    } catch (error) {
        yield put(revokeRoleFail(error));
    }
}

function* getAllUnsignedStaff() {
    try {
        const response = yield call(getAllUnsignedStaffApi);
        yield put(setAllUnsignedStaff(response.data));
    } catch (error) {
        console.log(error);
    }
}

function* setStaffToRole(action) {
    const { id, role } = action.payload;
    try {
        yield call(setStaffToRoleApi, id, role);
        yield put(setStaffToRoleSuccess(id, role));
    } catch (error) {
        yield put(setStaffToRoleFail(error));
    }
}

const superUserSaga = [
    takeLatest(GET_ALL_ASSIGNED_STAFF, getAllAssignedStaff),
    takeLatest(REVOKE_ROLE_START, revokeRole),
    takeLatest(GET_ALL_UNSIGNED_STAFF, getAllUnsignedStaff),
    takeLatest(SET_STAFF_TO_ROLE_START, setStaffToRole),
];

export default superUserSaga;
