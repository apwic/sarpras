import {all} from 'redux-saga/effects'
import superUserSaga from '../superuser/superuserSaga';
import authSaga from './auth/saga';

export default function* rootSaga() {
    yield all([
        ...authSaga,
        ...superUserSaga
    ]);
}