import {all} from 'redux-saga/effects'
import superUserSaga from '../superuser/saga';
import authSaga from './auth/saga';

export default function* rootSaga() {
    yield all([
        ...authSaga,
        ...superUserSaga
    ]);
}