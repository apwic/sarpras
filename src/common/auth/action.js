import { LOGIN, GET_USER, SET_USER, LOGOUT } from './actionTypes';

export function login() {
    return {
        type: LOGIN,
    };
}

export function logout() {
    return {
        type: LOGOUT,
    };
}

export function getUser() {
    return {
        type: GET_USER,
    };
}

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user,
    };
}
