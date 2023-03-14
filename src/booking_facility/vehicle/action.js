import { OPEN_MODAL_FILTER, CLOSE_MODAL_FILTER } from "./actionTypes";

export function openModalFilter() {
    return {
        type: OPEN_MODAL_FILTER,
    };
}

export function closeModalFilter() {
    return {
        type: CLOSE_MODAL_FILTER,
    };
}