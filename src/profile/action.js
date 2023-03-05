import { OPEN_MODAL, CLOSE_MODAL, EDIT_PROFILE } from "./actionTypes";

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

export function editProfile(profile) {
    return {
        type: EDIT_PROFILE,
        payload: profile,
    };
}