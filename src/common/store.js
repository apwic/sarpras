import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import vehicleReducer from '../booking_facility/vehicle/reducer';

import dashboardReducer from '../dashboard/reducer';
import profileReducer from '../profile/reducer';
import supeUserReducer from '../superuser/reducer';
import authReducer from './auth/reducer';
import rootSaga from './saga';

const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    superuser: supeUserReducer,
    auth: authReducer,
    profile: profileReducer,
    vehicle: vehicleReducer,
})

const sagaMiddleware = createSagaMiddleware();

const enhancers = applyMiddleware(sagaMiddleware)

const store = createStore(rootReducer, enhancers)

export default store;

sagaMiddleware.run(rootSaga)