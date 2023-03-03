import { OPEN_MODAL, CLOSE_MODAL } from "./actionTypes";

export function openModal(imgUrl) {
    return {
        type: OPEN_MODAL,
        payload: imgUrl,
    };
}

export function closeModal() {
    return {
        type: CLOSE_MODAL,
    };
}