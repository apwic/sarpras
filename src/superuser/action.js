import { OPEN_MODAL_SU, CLOSE_MODAL_SU, GET_ALL_ASSIGNED_STAFF, SET_ALL_ASSIGNED_STAFF } from "./actionTypes";


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