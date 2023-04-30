import {
    OPEN_MODAL,
    CLOSE_MODAL,
    EDIT_PROFILE,
    READ_ALL_NOTIFICATIONS,
} from './actionTypes';

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

export function readAllNotifications() {
    return {
        type: READ_ALL_NOTIFICATIONS,
    };
}
