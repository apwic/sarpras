import { OPEN_MODAL_SU, CLOSE_MODAL_SU, GET_ALL_ASSIGNED_STAFF } from "./actionTypes";


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

export function getAllAsignedStaffAction() {
    return {
        type: GET_ALL_ASSIGNED_STAFF,
        payload: [],
    };
}