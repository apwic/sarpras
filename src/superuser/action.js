import {
    OPEN_MODAL_SU,
    CLOSE_MODAL_SU,
    GET_ALL_ASSIGNED_STAFF,
    SET_ALL_ASSIGNED_STAFF,
    REVOKE_ROLE_START,
    REVOKE_ROLE_SUCCESS,
    REVOKE_ROLE_FAIL,
    GET_ALL_UNSIGNED_STAFF,
    SET_ALL_UNSIGNED_STAFF,
    SET_STAFF_TO_ROLE_START,
    SET_STAFF_TO_ROLE_SUCCESS,
    SET_STAFF_TO_ROLE_FAIL,
} from './actionTypes';

export function openModalSU(selectedRole) {
    return {
        type: OPEN_MODAL_SU,
        selectedRole,
    };
}

export function closeModalSU() {
    return {
        type: CLOSE_MODAL_SU,
    };
}

export function getAllAssignedStaffAction() {
    return {
        type: GET_ALL_ASSIGNED_STAFF,
    };
}

export function setAllAssignedStaff(staff) {
    return {
        type: SET_ALL_ASSIGNED_STAFF,
        payload: staff,
    };
}

export function revokeRoleStart(id, role) {
    return {
        type: REVOKE_ROLE_START,
        payload: {
            id,
            role,
        },
    };
}

export function revokeRoleSuccess(id, role) {
    return {
        type: REVOKE_ROLE_SUCCESS,
        payload: {
            id,
            role,
        },
    };
}

export function revokeRoleFail(error) {
    return {
        type: REVOKE_ROLE_FAIL,
        payload: error,
    };
}

export function getAllUnsignedStaffAction() {
    return {
        type: GET_ALL_UNSIGNED_STAFF,
    };
}

export function setAllUnsignedStaff(staff) {
    return {
        type: SET_ALL_UNSIGNED_STAFF,
        payload: staff,
    };
}

export function setStaffToRoleStart(id, role) {
    return {
        type: SET_STAFF_TO_ROLE_START,
        payload: {
            id,
            role,
        },
    };
}

export function setStaffToRoleSuccess(id, role) {
    return {
        type: SET_STAFF_TO_ROLE_SUCCESS,
        payload: {
            id,
            role,
        },
    };
}

export function setStaffToRoleFail(error) {
    return {
        type: SET_STAFF_TO_ROLE_FAIL,
        payload: error,
    };
}
