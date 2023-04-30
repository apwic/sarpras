import { call, put, takeLatest } from 'redux-saga/effects';

import { getUser } from '../common/auth/action';
import { EDIT_PROFILE, READ_ALL_NOTIFICATIONS } from './actionTypes';
import { editProfileAPI, readAllNotificationsAPI } from './api';

function* editProfile(action) {
    try {
        yield call(editProfileAPI, action.payload);
        yield put(getUser());
    } catch (error) {
        console.log(error);
    }
}

function* readAllNotifications() {
    try {
        yield call(readAllNotificationsAPI);
    } catch (error) {
        console.log(error);
    }
}

const profileSaga = [
    takeLatest(EDIT_PROFILE, editProfile),
    takeLatest(READ_ALL_NOTIFICATIONS, readAllNotifications),
];

export default profileSaga;
