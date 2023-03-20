import { call, put, takeLatest } from 'redux-saga/effects';

import { getUser } from '../common/auth/action';
import { EDIT_PROFILE } from './actionTypes';
import { editProfileAPI } from './api';

function* editProfile(action) {
    try {
        yield call(editProfileAPI, action.payload);
        yield put(getUser());
    } catch (error) {
        console.log(error);
    }
}

const profileSaga = [takeLatest(EDIT_PROFILE, editProfile)];

export default profileSaga;
