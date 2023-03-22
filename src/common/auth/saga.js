import { call, takeLatest, put } from '@redux-saga/core/effects';

import { LOGIN, GET_USER, LOGOUT } from './actionTypes';
import { setUser } from './action';
import { loginApi, getUserApi } from './api';
import { storage } from '../storage';

function* login() {
    try {
        const response = yield call(loginApi);
        storage.setToken(response.token);
        window.location.href = '/';
    } catch (error) {
        console.log(error);
    }
}

function logout() {
    storage.removeCreds();
    window.location.href = '/';
}

function* getUser() {
    try {
        const response = yield call(getUserApi);
        if (response.http_status && response.http_status === 401) {
            console.log('Unauthorized');
            storage.removeCreds();
            window.location.href = '/';
        }
        yield put(setUser(response.data));
    } catch (error) {
        console.log(error);
    }
}

const authSaga = [
    takeLatest(LOGIN, login),
    takeLatest(LOGOUT, logout),
    takeLatest(GET_USER, getUser),
];

export default authSaga;
