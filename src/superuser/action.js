import { OPEN_MODAL_SU, CLOSE_MODAL_SU, 
    GET_ALL_ASSIGNED_STAFF, SET_ALL_ASSIGNED_STAFF, 
    REVOKE_ROLE, GET_ALL_UNSIGNED_STAFF, SET_ALL_UNSIGNED_STAFF, SET_STAFF_TO_ROLE } from "./actionTypes";


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

export function revokeRoleAsync(userId) {
    return {
        type: REVOKE_ROLE,
        payload: userId,
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

export function setStafftoRole(userId, role){
    return {
        type: SET_STAFF_TO_ROLE,
        payload: {
            userId,
            role,
        }
    }
}